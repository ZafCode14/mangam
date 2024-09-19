"use client";
import Loading from "@/components/loading";
import Product from "@/components/product";
import useProducts from "@/hooks/products";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [products, loading] = useProducts();

  if (!loading) {
    return (
      <main className="flex flex-col items-center">

        {/** Hero Section */}
        <div className="flex h-[400px] w-full mt-[80px]">
          <div className="h-full w-[50%] relative flex justify-center items-end">
            <Image
              src={'/images/hero2.png'}
              alt="hero image"
              width={3000}
              height={3000}
              priority
              className="absolute w-full h-full object-cover"
            />
            <div className="relative text-white flex flex-col justify-center items-center">
              <h2 className="text-[22px] font-bold">Experience Something New</h2>
              <Link href={"/mall"} className="text-[14px] bg-[#2A1C1B] w-[180px] h-[44px] rounded-[4px] mb-8 mt-2 flex justify-center items-center">Shop in Mall</Link>
            </div>
          </div>
          <div className="h-full w-[50%] relative flex flex-col justify-end">
            <Image
              src={'/images/hero1.png'}
              alt="hero image"
              width={3000}
              height={3000}
              className="absolute w-full h-full object-cover"
            />
            <div className="relative text-white flex flex-col justify-center items-center">
              <h2 className="text-[22px] font-bold">All Your Favorite Brands In One Place</h2>
              <Link href={"/shop"} className="text-[14px] bg-[#2A1C1B] w-[180px] h-[44px] rounded-[4px] mb-8 mt-2 flex justify-center items-center">Shop by Brand</Link>
            </div>
          </div>
        </div>

        {/** Trending Products Section */}
        <div className="p-10 bg-[#E7E7E7]">
          <div className="bg-[#F1F1F1] rounded-[5%]">
            <div className="w-full">
              <p className="my-5 ml-20 text-[24px] font-bold">Trending Products</p> 
              <div className="flex">
                <div className="w-[50%] h-[650px] flex flex-wrap justify-end items-center">
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[0]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[1]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[2]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[3]} res={2000}/>
                  </div>
                </div>
                <div className="w-[50%] h-[650px] mt-20 flex items-center">
                  <div className="w-[97.5%] h-[650px] mb-20 mr-[2.5%]">
                    <Product product={products[4]} res={2000}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-20 pb-20">
              <div className="flex flex-row-reverse">
                <div className="h-[650px] w-[50%] flex flex-wrap items-center">
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[5]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[6]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[7]} res={2000}/>
                  </div>
                  <div className="w-[45%] h-[50%] mx-[2.5%] mb-20">
                    <Product product={products[8]} res={2000}/>
                  </div>
                </div>
                <div className="w-[50%] flex items-center justify-end mr-5 mt-10">
                  <div className="w-[97.5%] h-[650px] mb-20 ml-[2.5%]">
                    <Product product={products[9]} res={2000}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <Loading/>
    )
  }
}
