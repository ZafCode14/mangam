import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  // Add other fields based on your Firestore document structure
}
function Products() {
  const [products, setProducts] = useState<Product[]>([]); // Type the useState hook

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const productsCollection = collection(firestore, "products");  // Reference to the 'vendors' collection
        const productSnapshot = await getDocs(productsCollection);
        const productsList: Product[] = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsList); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    fetchVendors();
  }, []);
  console.log(products);
  return (
    <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
      height: "calc(100vh - 240px)"
    }}>
      {
        products.map((product, index) => (
          <div key={index} className="w-[220px] mx-1 relative text-black mb-10">
            <div className={`w-full h-[140px] object-cover overflow-hidden flex justify-center items-center`}>
              <Image
                src={product.images[0]}
                alt={'search icon'}
                width={100}
                height={100}
                priority
                className={`w-full`}
              />
            </div>
            <p className="relative font-bold">{product.name}</p>
            <div>

            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Products;