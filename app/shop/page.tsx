"use client";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useEffect, useState } from "react";

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  // Add other fields based on your Firestore document structure
}
function Page() {
  const [vendors, setVendors] = useState<Vendor[]>([]); // Type the useState hook

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsCollection = collection(firestore, "vendors");  // Reference to the 'vendors' collection
        const vendorsSnapshot = await getDocs(vendorsCollection);
        const vendorsList: Vendor[] = vendorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vendor[];
        setVendors(vendorsList); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    fetchVendors();
  }, []);
  console.log(vendors);

  return (
    <main className={`flex justify-center w-full h-screen text-white`}>
      <div className={`
        relative top-[70px]
        flex items-start justify-center
        max-w-full w-[1200px] pt-[50px]
      `} style={{
        height: "calc(100% - 70px)"
      }}>
        <div className={`w-[30%] bg-[#2A1C1B] h-[94%] rounded-md`}>
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
              <input placeholder="Search products" className={`ml-5 w-[70%] bg-[#E8E4E1] focus:outline-none text-black`}/>
              <div className={``}></div>
            </div>
            <button className={`
              bg-[#2A1C1B]
              w-[30%] h-[77px]
              rounded-md
            `}>Search by Product</button>
          </div>
          <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
            height: "calc(100vh - 240px)"
          }}>
            {
              vendors.map((vendor, index) => (
                <div key={index} className="w-[220px] mx-1 relative text-black mb-10">
                  <div className={`w-full h-[140px] object-cover overflow-hidden flex justify-center items-center`}>
                    <Image
                      src={vendor.logo}
                      alt={'search icon'}
                      width={100}
                      height={100}
                      priority
                      className={`w-full`}
                    />
                  </div>
                  <p className="relative font-bold">{vendor.name}</p>
                  <div>

                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;