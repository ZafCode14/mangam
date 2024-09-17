"use client";
import { useEffect, useState } from 'react';
import useVendors from '@/hooks/vendors'; // Import your custom hook
import Image from 'next/image';
import Products from '@/components/products';

interface BrandPageProps {
  params: { brandId: string };
}

const Page = ({ params }: BrandPageProps) => {
  const { brandId } = params;
  const [vendors, loading, error] = useVendors(); // Using your custom hook to fetch vendors
  const [isValidBrandId, setIsValidBrandId] = useState(false);

  useEffect(() => {
    if (!loading && !error && vendors.length > 0) {
      // Check if the brandId exists in the list of vendors
      const foundVendor = vendors.find((vendor) => vendor.docID === brandId);
      if (foundVendor) {
        setIsValidBrandId(true);
      } else {
        setIsValidBrandId(false); // brandId not found
      }
    }
  }, [loading, error, vendors, brandId]);

  if (loading) {
    return <p className='mt-[500px]'>Loading...</p>; // Show a loading state while fetching vendors
  }

  if (error) {
    return <p className='mt-[500px]'>Error loading vendors: {error.message}</p>; // Handle error case
  }

  if (!isValidBrandId) {
    return <p className='mt-[500px]'>Brand not found</p>; // Return a message if brandId is invalid (or handle 404 if needed)
  }

  return (
    <main className={`flex justify-center w-full h-screen text-white`}>
      <div className={`
        relative top-[70px]
        flex items-start justify-center
        max-w-full w-[1200px] pt-[50px]
      `} style={{
        height: "calc(100% - 70px)"
      }}>
        <div className={`w-[30%] bg-[#E8E4E1] h-[94%] rounded-md`}>
        </div>
        <div className="w-full">
          <div className={`h-full w-full flex justify-between ml-5`}>
            <div className={`
            bg-[#E8E4E1] 
            flex items-center
            h-[77px] w-[70%] rounded-md mr-5
            `}>
              <Image
                src={'/icons/search.svg'}
                alt={'search icon'}
                width={100}
                height={100}
                priority
                className={`h-[30px] w-auto ml-5`}
              />
              <input placeholder="Search products" className={`ml-5 w-[70%] bg-[#e8e4e1] focus:outline-none text-black`}/>
              <div className={``}></div>
            </div>
            <button className={`
              bg-[#2A1C1B]
              w-[30%] h-[77px]
              rounded-md
            `}>Visit Virtual Store</button>
          </div>
          <Products brandId={brandId}/>
        </div>
      </div>
    </main>
  );
};

export default Page;