"use client";
import { Suspense, useState, useEffect } from "react";
import Brands from "@/components/brands";
import Products from "@/components/products";
import Filter from "@/components/filter";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";

// Separate component to handle search params
function ShowComponent({
  search,
  setSearch,
  categories,
  price,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string | null>(searchParams.get("show"));

  useEffect(() => {
    const a = searchParams.get("show");
    setShow(a);
  }, [searchParams]);

  return (
    <>
      <Search search={search} setSearch={setSearch} show={show} />
      {show === "brand" ? (
        <Brands search={search} />
      ) : (
        <Products
          brandId={"all"}
          search={search}
          categories={categories}
          price={price}
          height={170}
        />
      )}
    </>
  );
}

function Page() {
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000]);
  const searchParams = useSearchParams();
  const [show, setShow] = useState<string | null>(searchParams.get("show"));

  useEffect(() => {
    const a = searchParams.get("show");
    setShow(a);
  }, [searchParams]);

  return (
    <main className="flex justify-center w-full h-screen text-white">
      <div
        className="relative top-[70px] flex items-start justify-center w-full pt-[30px] px-24"
        style={{ height: "calc(100% - 70px)" }}
      >
        <Filter
          price={price}
          categories={categories}
          setCategories={setCategories}
          setPrice={setPrice}
          marginTop="40%"
          brandId=""
          show={show}
        />

        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ShowComponent
              search={search}
              setSearch={setSearch}
              categories={categories}
              setCategories={setCategories}
              price={price}
              setPrice={setPrice}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export default Page;
