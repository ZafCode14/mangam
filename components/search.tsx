import Image from "next/image";
import Link from "next/link";

interface SearchProps {
  brand: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setBrand?: React.Dispatch<React.SetStateAction<boolean>>
}
function Search({ brand, search, setSearch, setBrand }:SearchProps) {
  return (
    <div className={`h-full w-full flex justify-between`}>

      {/** Input bar */}
      <div className={`
      bg-[#d8d1cd] 
      flex items-center
      h-[50px] flex-1 rounded-lg mr-2
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

      {/** Button */}
      {!setBrand ?
      <Link href={'/mall'}>
        <button className={`
          bg-[#2A1C1B]
          w-[200px] h-[50px] text-[14px]
          rounded-lg
        `}>Virtual Store</button>
      </Link>
      :
      <button onClick={() => setBrand(prev => !prev)} className={`
        bg-[#2A1C1B]
        w-[200px] h-[50px] text-[14px]
        rounded-lg
      `}>{!brand ? "Search by Brand" : "Search by Product"}</button>
      }
    </div>
  );
}

export default Search;