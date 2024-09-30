"use client";
import { Suspense, useState, useEffect } from "react";
import Brands from "@/components/brands";
import Products from "@/components/products";
import Filter from "@/components/filter";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";
import useWindowDimensions from "@/hooks/dimentions";

// Separate component to handle search params
function ShowComponent({
  search,
  setSearch,
  categories,
  price,
  setShowFilter
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string | null>(searchParams.get("show"));

  useEffect(() => {
    const a = searchParams.get("show");
    setShow(a);
  }, [searchParams]);

  const {width} = useWindowDimensions();

  return (
    <div className="h-full flex flex-col justify-end">
      <Search search={search} setSearch={setSearch} show={show} setShowFilter={setShowFilter}/>
      {show === "brand" ? (
        <Brands search={search} />
      ) : (
        <Products
          brandId={"all"}
          search={search}
          categories={categories}
          price={price}
          height={width <= 768 ? 230 : 150}
        />
      )}
    </div>
  );
}

function Page() {
  const [search, setSearch] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000]);

  return (
    <main className="flex justify-center w-full h-[100vh] text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <div
          className="relative top-[70px] flex items-start justify-center w-full pt-[30px] md:px-[5vw] px-2"
          style={{ height: "calc(100% - 70px)" }}
        >
          <div className={`
            ${showFilter ? "block" : "hidden"}
            fixed top-0 right-0 z-10 lg:static
            flex justify-center items-center lg:block
            w-screen h-[100vh] lg:w-auto lg:mr-5 lg:mt-24 lg:h-auto
            bg-[#000000cb] lg:bg-transparent
          `} onClick={() => setShowFilter(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Filter
                price={price}
                categories={categories}
                setCategories={setCategories}
                setPrice={setPrice}
                marginTop="md:mt-[0]"
                brandId=""
              />
            </div>
          </div>

          <div className="w-full">
            <ShowComponent
              search={search}
              setSearch={setSearch}
              categories={categories}
              setCategories={setCategories}
              price={price}
              setPrice={setPrice}
              setShowFilter={setShowFilter}
            />
          </div>
        </div>
      </Suspense>
    </main>
  );
}

export default Page;
