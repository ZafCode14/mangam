"use client";
import Brands from "@/components/brands";
import Products from "@/components/products";
import { useState } from "react";
import Filter from "@/components/filter";
import Search from "@/components/search";

function Page() {
  const [brand, setBrand] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000])


  return (
    <main className={`flex justify-center w-full h-screen text-white`}>
      <div className={`
        relative top-[70px]
        flex items-start justify-center
        w-full pt-[30px] px-24
      `} style={{
        height: "calc(100% - 70px)"
      }}>

        <Filter
          brand={brand}
          price={price}
          categories={categories}
          setCategories={setCategories}
          setPrice={setPrice}
          marginTop="40%"
        />

        <div className="w-full">
          <Search
            brand={brand}
            search={search}
            setSearch={setSearch}
            setBrand={setBrand}
          />

          {/** Brands or Products */}
          {brand ?  <Brands search={search}/> : <Products brandId={"all"} search={search} categories={categories} price={price} height={170}/>}
        </div>
      </div>
    </main>
  );
}

export default Page;