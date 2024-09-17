import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import Product from "./product";

export interface ProductAttr {
  id: string;
  name: string;
  description: string;
  images: string[];
  brandDocID: string;
  // Add other fields based on your Firestore document structure
}
interface Prop {
  brandId: string;
}
function Products({ brandId }: Prop) {
  const [products, setProducts] = useState<ProductAttr[]>([]); // Type the useState hook

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const productsCollection = collection(firestore, "products");  // Reference to the 'vendors' collection
        const productSnapshot = await getDocs(productsCollection);
        const productsList: ProductAttr[] = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductAttr[];
        setProducts(productsList); // Set the state with the fetched data
      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
      height: "calc(100vh - 240px)"
    }}>
      {
        products.map((product, index) => {
          if (brandId === "all") {
            return (
              <Product key={index} product={product}/>
            )
          } else  {
            if (brandId === product.brandDocID) {
              return (
                <Product key={index} product={product}/>
              )
            }
          }
        })
      }
    </div>
  );
}

export default Products;