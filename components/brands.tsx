import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  // Add other fields based on your Firestore document structure
}
function Brands() {
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
  );
}

export default Brands;