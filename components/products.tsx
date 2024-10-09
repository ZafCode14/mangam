import { fetchVendors } from "@/lib/api";
import { useEffect, useState } from "react";
import Product from "./product";

interface Prop {
  brandId: string;
  search: string;
  categories: string[];
  price: number[];
  height: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[]; // Use the ProductAttr type for better type safety
}

const Products = ({ brandId, search, categories, price, height, products }: Prop) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendors, setVendors] = useState<any[]>([]); // Store all vendors

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const fetchedVendors = await fetchVendors();
        setVendors(fetchedVendors);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    loadVendors();
  }, []);

  // Filter products based on criteria
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesPrice = product.price >= price[0] && product.price <= price[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div
      className="flex flex-wrap justify-around overflow-y-scroll pb-24"
      style={{
        maxHeight: `calc(100vh - ${height}px)`,
      }}
    >
      {filteredProducts.map((product) => {
        if (brandId === "all" || brandId === product.brandDocID) {
          return (
            <div
              key={product.docID} // Use unique identifier for key
              className="max-w-[48%] w-[200px] xl:w-[18%] h-[150px] mb-[60px] mx-[1%] mt-5"
            >
              <Product product={product} res={300} vendors={vendors} />
            </div>
          );
        }
        return null; // If brandId does not match, return null
      })}
    </div>
  );
};

export default Products;