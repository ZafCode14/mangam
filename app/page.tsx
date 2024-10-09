"use client";
import Loading from "@/components/loading";
import Product from "@/components/product";
import { fetchProducts, fetchVendors } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]); // State to store products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendors, setVendors] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null); // State to manage errors

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(undefined, 10);
        setProducts(fetchedProducts);
        const fetchedVendors = await fetchVendors();
        setVendors(fetchedVendors);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products."); // Update error state
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/** Hero Section */}
      <div className="flex h-[400px] w-full mt-[80px]">
        <div className="h-full w-full md:w-1/2 relative flex justify-center items-end">
          <Image
            src={'/images/hero2.png'}
            alt="hero image"
            width={3000}
            height={3000}
            priority
            className="absolute w-full h-full object-cover"
          />
          <div className="relative text-white flex flex-col justify-center items-center">
            <h2 className="text-[18px] md:text-[22px] font-bold">Experience Something New</h2>
            <h2 className="md:hidden text-[18px] md:text-[22px] font-bold">All Your Favorite Brands In One Place</h2>
            <div className="flex">
              <Link href={"/mall"} className="text-[14px] bg-[#2A1C1B] w-[150px] md:w-[180px] h-[44px] rounded-[4px] mb-12 mt-2 flex justify-center items-center">
                Shop in Mall
              </Link>
              <Link href={"/shop?show=brand"} className="md:hidden text-[14px] bg-[#2A1C1B] w-[150px] md:w-[180px] h-[44px] rounded-[4px] mb-8 mt-2 ml-3 flex justify-center items-center">
                Shop by Brand
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex h-full w-1/2 relative flex-col justify-end">
          <Image
            src={'/images/hero1.png'}
            alt="hero image"
            width={3000}
            height={3000}
            className="absolute w-full h-full object-cover"
          />
          <div className="relative text-white flex flex-col justify-center items-center">
            <h2 className="text-[22px] font-bold">All Your Favorite Brands In One Place</h2>
            <Link href={"/shop?show=brand"} className="text-[14px] bg-[#2A1C1B] w-[180px] h-[44px] rounded-[4px] mb-12 mt-2 flex justify-center items-center">Shop by Brand</Link>
          </div>
        </div>
      </div>

      {loading ?
      <Loading/> :
      <div className="p-3 md:p-10 bg-[#E7E7E7]">
        <div className="flex-col items-center pb-5 md:pb-0 bg-[#F1F1F1] rounded-[10vw] md:rounded-[5vw]">
          <p className="flex justify-center md:block w-full py-10 my-5 md:ml-10 text-[24px] font-bold">
            Trending Products
          </p>

          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full">
            <div className="flex flex-col-reverse md:flex-row">
              <div className="w-full md:w-1/2 h-[90vw] md:h-[40vw] flex flex-wrap justify-end items-center">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product vendors={vendors} product={product} res={2000} />
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/2 md:mt-20 flex items-center">
                {products[4] && (
                  <div className="w-[97.5%] h-[90vw] md:h-[40vw] mb-20 mx-[2.5%]">
                    <Product vendors={vendors} product={products[4]} res={2000} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-20 mb-20 pb-20">
            <div className="flex flex-col-reverse md:flex-row-reverse">
              <div className="h-[90vw] md:h-[40vw] w-full md:w-1/2 flex flex-wrap items-center">
                {products.slice(5, 9).map((product) => (
                  <div key={product.id} className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product vendors={vendors} product={product} res={2000} />
                  </div>
                ))}
              </div>
              <div className="w-full md:w-1/2 flex items-center justify-end mr-5 mt-20 md:mt-10">
                {products[9] && (
                  <div className="w-[97.5%] h-[90vw] md:h-[40vw] mb-20 ml-[2.5%]">
                    <Product vendors={vendors} product={products[9]} res={2000} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </main>
  );
}