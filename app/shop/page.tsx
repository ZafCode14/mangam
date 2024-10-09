"use client";
import { Suspense, useState, useEffect } from "react";
import Brands from "@/components/brands";
import Products from "@/components/products";
import Filter from "@/components/filter";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";
import useWindowDimensions from "@/hooks/dimentions";
import { fetchProducts, fetchVendors } from "@/lib/api";
import Loading from "@/components/loading";

// Separate component to handle search params
function ShowComponent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000]);
  const [floor, setFloor] = useState<string>("");

  const [show, setShow] = useState<string | null>(searchParams.get("show"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vendors, setVendors] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To track loading state

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        if (show === "brand") {
          // Fetch all vendors
          const allVendors = await fetchVendors();
          setVendors(allVendors);
        } else if (show === "product") {
          // Fetch all products (optionally, you can pass params if needed)
          const allProducts = await fetchProducts();
          setProducts(allProducts);
        }

        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching vendors or products:", err);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    loadData();
  }, [show]);

  useEffect(() => {
    const a = searchParams.get("show");
    setShow(a);
  }, [searchParams]);

  const {width} = useWindowDimensions();

  if (loading) {
    return <Loading/>
  }
  return (
    <div
      className="relative top-[70px] flex items-start justify-center w-full pt-[30px] md:px-[5vw] px-2"
      style={{ height: "calc(100% - 70px)" }}
    >
      <div className={`
        ${showFilter ? "block" : "hidden"}
        fixed top-0 right-0 z-10 lg:static
        flex justify-center items-center lg:block
        w-screen h-[100vh] lg:w-auto lg:mr-5 lg:mt-24 lg:h-auto
        lg:bg-transparent backdrop-blur-md
      `} onClick={() => setShowFilter(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <Filter
            price={price}
            products={products}
            categories={categories}
            setCategories={setCategories}
            setPrice={setPrice}
            setFloor={setFloor}
            floor={floor}
            marginTop="md:mt-[0]"
          />
        </div>
      </div>

      <div className="w-full">
        <Search search={search} setSearch={setSearch} show={show} setShowFilter={setShowFilter}/>
        {show === "brand" ? (
          <Brands 
            search={search}
            floor={floor}
            vendors={vendors}
          />
        ) : (
          <Products
            brandId={"all"}
            search={search}
            categories={categories}
            price={price}
            height={width <= 768 ? 230 : 150}
            products={products}
          />
        )}
      </div>
    </div>
  );
}

function Page() {
  return (
    <main className="flex justify-center w-full h-[100vh] text-white">
      <Suspense fallback={<Loading/>}>
          <ShowComponent />
      </Suspense>
    </main>
  );
}

export default Page;