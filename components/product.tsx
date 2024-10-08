import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export interface Product {
  name: string;
  images: string[];
  docID: string;
  price: number;
  description: string;
  brandDocID: string;
}
interface Vendor {
  id: string;
  name: string;
  logo: string;
  docID: string;
  // Add other vendor fields if necessary
}

export interface Prop {
  product: Product;
  res: number;
}
function Product({ product, res }:Prop) {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsCollection = collection(firestore, 'vendors');
        const approvedVendorsQuery = query(vendorsCollection, where('status', '==', 'approved')); // Add the 'status' filter
        const vendorsSnapshot = await getDocs(approvedVendorsQuery);
        const vendorsList: Vendor[] = vendorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vendor[];
        setVendors(vendorsList); // Set the state with the fetched data
      } catch (error) {
        console.error(error)
      }
    };

    fetchVendors();
  }, []);


  if (vendors) {
    const brand = vendors.find((vendor: Vendor) => vendor.docID === product.brandDocID);

    return (
      <Link href={`/shop/product/${product.docID}`} className="w-full h-full relative text-black">
        <div className={`w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
          <Image
            src={product.images[0]}
            alt={'search icon'}
            width={res}
            height={res}
            priority
            className={`object-contain h-full`}
          />
        </div>
        <p className="relative font-bold leading-[16px] mt-[5px]">{product.name}</p>
        <p className="relative text-[12px]">{brand?.name}</p>
        <p className="relative text-[12px]">{product.price} EGP</p>
      </Link>
    );
  }

  }

export default Product;