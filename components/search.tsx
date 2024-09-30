import Image from "next/image";
import Link from "next/link";

interface SearchProps {
  search: string;
  show: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setBrand?: React.Dispatch<React.SetStateAction<boolean>>
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}
function Search({ search, setSearch, show, setShowFilter }:SearchProps) {
  return (
    <div className={`h-full w-full flex flex-col-reverse md:flex-row justify-between items-end`}>

      {/** Input bar */}
      <div className={`
      relative
      bg-[#d8d1cd] w-full 
      flex items-center
      h-[50px] flex-1 rounded-lg md:mr-2 mt-2 md:mt-0
      `}>
        <Image
          src={'/icons/filter.svg'}
          alt={'filter icon'}
          width={100}
          height={100}
          priority
          onClick={() => setShowFilter(true)}
          className={`lg:hidden h-[30px] w-auto ml-5 absolute right-5`}
        />
        <Image
          src={'/icons/search.svg'}
          alt={'search icon'}
          width={100}
          height={100}
          priority
          className={`h-[16px] w-auto ml-5`}
        />
        <input 
          placeholder={show === 'brand' ? "Search brand" : "Search products"} 
          className={`
            ml-2 w-[70%] h-[50px]
            focus:outline-none
            bg-[#d8d1cd] text-black
          `}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/** Button */}
      {show !== 'brand' && show !== 'product' ?
      <Link href={'/mall'}>
        <button className={`
          bg-[#2A1C1B]
          w-[200px] h-[50px] text-[14px]
          rounded-lg
        `}>Virtual Store</button>
      </Link>
      :
      <Link href={{
        pathname: "/shop", 
        query: {show: `${show === 'brand' ? 'product' : 'brand'}`}
      }} className={`
        flex justify-center items-center
        bg-[#2A1C1B]
        w-[200px] h-[50px] text-[14px]
        rounded-lg
      `}>{show === 'brand' ? "Search by Product" : "Search by Brand"}</Link>
      }
    </div>
  );
}

export default Search;