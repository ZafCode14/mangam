import Image from "next/image";
import React from "react";
import ReactSlider from 'react-slider';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface FilterProp {
  brandId?: string;
  price: number[];
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setFloor?: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  marginTop: string;
  floor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
}
function Filter({ marginTop, price, categories, setShowFilter, setPrice, setFloor, setCategories, products}:FilterProp) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchParams = useSearchParams();

  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [show, setShow] = useState<string | null>(searchParams.get("show"));
  const [gold, setGold] = useState<boolean>(false);
  const [silver, setSilver] = useState<boolean>(false);
  const [raw, setRaw] = useState<boolean>(false);

  useEffect(() => {
    const allCategories = products.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(allCategories)); // Remove duplicates
    setFilteredCategories(uniqueCategories);
  }, [products])

  useEffect(() => {
    const a = searchParams.get("show");
    setShow(a);
  }, [searchParams]);

  useEffect(() => {
    if (setFloor) {
      if (gold) {
        setFloor("gold");
      } else if (silver) {
        setFloor("silver");
      } else if (raw) {
        setFloor("raw");
      } else {
        setFloor("");
      }
    }
  }, [gold, silver, raw, setFloor])

  // Function to handle category toggling
  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category) // Remove if already selected
        : [...prevCategories, category] // Add if not selected
    );
  };

  const handleFloorChange = (floor: string) => {
    if (floor === "gold") {
      setGold(!gold);
      setSilver(false);
      setRaw(false);
    } else if (floor === "silver") {
      setSilver(!silver);
      setGold(false);
      setRaw(false);
    } else if (floor === "raw") {
      setRaw(!raw);
      setGold(false);
      setSilver(false);
    }
  }

  const handlePrice = (newPrice: number[]) => {
    setPrice(newPrice);
  } 

  return (
    <div>
        <div className={`w-[300px] ${marginTop}`}>
          {show === 'brand' ?
            <div className='bg-[#2A1C1B] rounded-md flex flex-col h-[400px]'>
              <Image
                alt='gold'
                src={'/images/mall/elevator/goldFloor.png'}
                width={500}
                height={500}
                priority
                onClick={() => {
                  handleFloorChange("gold");
                  setTimeout(() => setShowFilter(false), 500);
                }}
                className={`w-full h-auto`}
                style={{
                  marginBottom: gold ? "20px" : "0px",
                  transition: ".4s ease"
                }}
              />
              <Image
                alt='silver'
                src={'/images/mall/elevator/silverFloor.png'}
                width={500}
                height={500}
                onClick={() => {
                  handleFloorChange("silver");
                  setTimeout(() => setShowFilter(false), 500);
                }}
                className={`w-full h-auto`}
                style={{
                  marginBottom: silver ? "10px" : "0px",
                  marginTop: silver ? "10px" : "0px",
                  transition: ".4s ease"
                }}
              />
              <Image
                alt='raw'
                src={'/images/mall/elevator/rawFloor.png'}
                width={500}
                height={500}
                onClick={() => {
                  handleFloorChange("raw");
                  setTimeout(() => setShowFilter(false), 500);
                }}
                className={`w-full h-auto`}
                style={{
                  marginTop: raw ? "12px" : "0px",
                  transition: ".4s ease"
                }}
              />
            </div>
          :
            <div className="bg-[#d8d1cd] rounded-md text-black flex flex-col p-5">
              <h4 className='text-lg'>Categories</h4>
              <div className='w-[40px] border-b-[1px] border-black  mb-3 mt-1'></div>
              {filteredCategories.map((category) => (
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
    </div>
  );
}
export default Filter;