"use client";
import ReactSlider from 'react-slider';
import Image from "next/image";
import Brands from "@/components/brands";
import Products from "@/components/products";
import { useState } from "react";

function Page() {
  const [brand, setBrand] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>([0, 300000])

  // Function to handle category toggling
  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category) // Remove if already selected
        : [...prevCategories, category] // Add if not selected
    );
  };

  const handlePrice = (newPrice: number[]) => {
    setPrice(newPrice);
  } 

  return (
    <main className={`flex justify-center w-full h-screen text-white`}>
      <div className={`
        relative top-[70px]
        flex items-start justify-center
        max-w-full w-[1200px] pt-[50px] px-5
      `} style={{
        height: "calc(100% - 70px)"
      }}>

        <div className={`w-[30%] ${brand ? "bg-[#2A1C1B]" : "bg-[#d8d1cd]"} rounded-md mr-5`}>
          {brand ?
            <div className='flex flex-col'>
              <Image
                alt='gold'
                src={'/images/mall/elevator/goldFloor.png'}
                width={500}
                height={500}
                className='w-full h-auto'
              />
              <Image
                alt='silver'
                src={'/images/mall/elevator/silverFloor.png'}
                width={500}
                height={500}
                className='w-full h-auto'
              />
              <Image
                alt='raw'
                src={'/images/mall/elevator/rawFloor.png'}
                width={500}
                height={500}
                className='w-full h-auto'
              />
            </div>
          :
            <div className="text-black flex flex-col p-5">
              <h4 className='text-lg'>Categories</h4>
              <div className='w-[40px] border-b-[1px] border-black  mb-3 mt-1'></div>
              {["Anklets", "Bracelets", "Necklaces", "Rings", "Earrings", "Bangles"].map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category}
                    checked={categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-2">{category}</label>
                </div>
              ))}

              <div className="w-full flex flex-col items-center mt-7">
                <h4 className="self-start text-lg">Price Range</h4>
              <div className='w-[40px] border-b-[1px] border-black  mb-8 mt-1 self-start'></div>
                <div className="w-full">
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[0, 300000]}
                    min={0}
                    max={300000}
                    step={500}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    pearling
                    minDistance={0}
                    onChange={handlePrice}
                  />
                  <div className="flex justify-between mt-4 text-sm">
                    <span>Price: {price[0]} EGP</span>
                    <span>{price[1]} EGP</span>
                  </div>
                </div>
              </div>

            </div>
          }
        </div>

        <div className="w-full">
          <div className={`h-full w-full flex justify-between`}>
            <div className={`
            bg-[#d8d1cd] 
            flex items-center
            h-[60px] w-[70%] rounded-md mr-5
            `}>
              <Image
                src={'/icons/search.svg'}
                alt={'search icon'}
                width={100}
                height={100}
                priority
                className={`h-[16px] w-auto ml-5`}
              />
              <input 
                placeholder={brand ? "Search brand" : "Search products"} 
                className={`ml-2 w-[70%] bg-[#d8d1cd] focus:outline-none text-black`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button onClick={() => setBrand(prev => !prev)} className={`
              bg-[#2A1C1B]
              w-[30%] h-[60px]
              rounded-md
            `}>{!brand ? "Search by Brand" : "Search by Product"}</button>
          </div>
          {brand ?  <Brands search={search}/> : <Products brandId={"all"} search={search} categories={categories} price={price}/>}
        </div>
      </div>
    </main>
  );
}

export default Page;