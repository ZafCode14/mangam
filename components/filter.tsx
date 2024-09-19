import Image from "next/image";
import React from "react";
import ReactSlider from 'react-slider';

interface FilterProp {
  brand: boolean;
  price: number[];
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  marginTop: string;
}
function Filter({ marginTop, brand, price, categories, setPrice, setCategories }:FilterProp) {
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
    <div>
        <div className={`w-[300px] mr-5 mt-[${marginTop}]`}>
          {brand ?
            <div className='bg-[#2A1C1B] rounded-md flex flex-col h-[400px]'>
              <Image
                alt='gold'
                src={'/images/mall/elevator/goldFloor.png'}
                width={500}
                height={500}
                priority
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
            <div className="bg-[#d8d1cd] rounded-md text-black flex flex-col p-5">
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
    </div>
  );
}

export default Filter;