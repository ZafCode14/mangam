"use client";
import Loading from "@/components/loading";
import Product from "@/components/product";
import useProducts from "@/hooks/products";

export default function Home() {
  const [products, loading] = useProducts();

  if (!loading) {
    return (
      <main className="flex flex-col items-center">
        <div className="flex h-[500px] w-full">
          <div className="h-full w-[50%] bg-gray-300">
            <h2>Experience Something New</h2>
            <button>Shop in Mall</button>
          </div>
          <div className="h-full w-[50%] relative bg-gray-400">
            <h2>All Your Favorite Brands In One Place</h2>
            <button>Shop by Brand</button>
          </div>
        </div>
        <div className="w-[1200px] mt-20">
          <p className="mb-10">Trending Products</p> 
          <div className="flex">
            <div className="w-[50%] flex flex-wrap justify-end items-center">
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[0]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[1]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[2]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[3]} res={2000}/>
              </div>
            </div>
            <div className="w-[50%] flex items-center">
              <div className="w-[550px] h-[650px] mb-20">
                <Product product={products[4]} res={2000}/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1200px] mt-10">
          <div className="flex flex-row-reverse">
            <div className="w-[50%] flex flex-wrap items-center">
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[5]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[6]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[7]} res={2000}/>
              </div>
              <div className="w-[250px] h-[250px] mr-5 mb-20">
                <Product product={products[8]} res={2000}/>
              </div>
            </div>
            <div className="w-[50%] flex items-center justify-end mr-5">
              <div className="w-[500px] h-[650px] mb-20">
                <Product product={products[9]} res={2000}/>
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
