"use client";
import { useEffect, useState } from 'react';
import useVendors from '@/hooks/vendors';
import Products from '@/components/products';
import Loading from '@/components/loading';
import Filter from '@/components/filter';
import Search from '@/components/search';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useWindowDimensions from '@/hooks/dimentions';

interface Brand {
  logo: string
}
interface BrandPageProps {
  params: { brandId: string };
}
const Page = ({ params }: BrandPageProps) => {
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000])
  const { brandId } = params;
  const [vendors, loading, error] = useVendors();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [isValidBrandId, setIsValidBrandId] = useState(false);
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string | null>(searchParams.get('show'));
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const {width} = useWindowDimensions();

  useEffect(() => {
    const a = searchParams.get('show');
    setShow(a);
  }, [searchParams]);


  useEffect(() => {
    if (!loading && !error && vendors.length > 0) {
      // Check if the brandId exists in the list of vendors
      const foundVendor = vendors.find((vendor) => vendor.docID === brandId);
      
      if (foundVendor) {
        setIsValidBrandId(true);
        setBrand(foundVendor);
      } else {
        setIsValidBrandId(false); // brandId not found
      }
    }
  }, [loading, error, vendors, brandId]);

  if (loading) {
    return <Loading/>; // Show a loading state while fetching vendors
  }

  if (!isValidBrandId) {
    return <p className='mt-[500px]'>Brand not found</p>; // Return a message if brandId is invalid (or handle 404 if needed)
  }

  if (brand) {
    return (
      <main className={`flex flex-col items-center  w-full text-white`}>
        <div className='relative mt-[80px] w-full flex justify-center items-center'>
          <Image
            src={brand.logo}
            alt='brand logo'
            width={300}
            height={300}
            priority
            className='h-[70px] lg:h-[110px] object-contain my-5 w-auto'
          />
          <Link href={'/shop?show=brand'} className={`
            absolute left-[10%]
            flex justify-center items-center
            text-[40px] w-[80px] h-[80px] rounded-full
            cursor-pointer
            hover:bg-[#e4e4e4]
          `}>
            <p className={`
            text-black
              mb-[5px]
            `}>&larr;</p>
          </Link>
        </div>

        <div className={`
          relative
          flex items-start justify-center
          w-full lg:px-24 px-2
        `}>

          <div className={`
            ${showFilter ? "block" : "hidden"}
            fixed top-0 right-0 z-10 lg:static
            flex justify-center items-center lg:block
            w-screen h-[100vh] lg:w-auto lg:mr-5 lg:mt-24 lg:h-auto
            lg:bg-transparent
          `} onClick={() => setShowFilter(false)}>
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
            <Search search={search} setSearch={setSearch} show={show} setShowFilter={setShowFilter} brandId={brandId}/>
            <Products brandId={brandId} search={search} categories={categories} price={price} height={width <= 768 ? 300 : 300}/>
        </div>
        </div>
      </main>
    );
  } else {
    <Loading/>  
  }
};

export default Page;