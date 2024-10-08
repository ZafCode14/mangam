"use client";
import { useEffect, useState } from 'react';
import Products from '@/components/products';
import Loading from '@/components/loading';
import Filter from '@/components/filter';
import Search from '@/components/search';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useWindowDimensions from '@/hooks/dimentions';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

interface Brand {
  logo: string;
}

interface BrandPageProps {
  params: { brandId: string };
}

const Page = ({ params }: BrandPageProps) => {
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000]);
  const { brandId } = params;
  const [brand, setBrand] = useState<Brand | null>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const p = usePathname();
  console.log(p.split('/').reverse()[0]);


  useEffect(() => {
    const fetchVendors = async () => {
      try {
        // Reference the document by its ID (show)
        const vendorDocRef = doc(firestore, "vendors", p.split('/').reverse()[0]);

        // Fetch the document snapshot
        const vendorSnapshot = await getDoc(vendorDocRef);

        if (vendorSnapshot.exists()) {
          // If the document exists, set the state with the vendor data
          setBrand(vendorSnapshot.data() as Brand);
        } else {
          console.log("Vendor not found");
        }
      } catch (error) {
        console.error("Error fetching vendor:", error);
      }
    };
    fetchVendors();
  }, [p]);

  if (brand) {
    return (
      <main className={`flex flex-col items-center w-full text-white`}>
        <div className='relative mt-[80px] w-full flex justify-center items-center'>
          <Image
            src={brand.logo}
            alt='brand logo'
            width={300}
            height={300}
            priority
            className='h-[70px] lg:h-[110px] object-contain my-5 w-auto'
          />
          <Link
            href={'/shop?show=brand'}
            className={`
              absolute left-[10%]
              flex justify-center items-center
              text-[40px] w-[80px] h-[80px] rounded-full
              cursor-pointer
              hover:bg-[#e4e4e4]
            `}
          >
            <p className={`text-black mb-[5px]`}>&larr;</p>
          </Link>
        </div>

        <div className={`
          relative flex items-start justify-center
          w-full lg:px-24 px-2
        `}>
          <div
            className={`
              ${showFilter ? "block" : "hidden"}
              fixed top-0 right-0 z-10 lg:static
              flex justify-center items-center lg:block
              w-screen h-[100vh] lg:w-auto lg:mr-5 lg:mt-24 lg:h-auto
              lg:bg-transparent
            `}
            onClick={() => setShowFilter(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Filter
                price={price}
                categories={categories}
                setCategories={setCategories}
                setPrice={setPrice}
                marginTop="md:mt-[0]"
                brandId=""
              />
            </div>
          </div>
          <div className="w-full">
            <Search
              search={search}
              setSearch={setSearch}
              setShowFilter={setShowFilter}
              brandId={brandId}
            />
            <Products
              brandId={brandId}
              search={search}
              categories={categories}
              price={price}
              height={width <= 768 ? 300 : 300}
            />
          </div>
        </div>
      </main>
    );
  } else {
    return <Loading />;  // Return Loading when `brand` is null
  }
};

export default Page;