import Image from "next/image";
import Link from "next/link";
import useWindowDimensions from "@/hooks/dimentions";

interface BrandProps {
  search: string;
  floor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendors: any[];
}
function Brands({ search, floor, vendors }:BrandProps) {
  const {width} = useWindowDimensions();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredBrands = vendors.filter((vendor: any) =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) &&
    vendor.chosenShopStyle.includes(floor)
  );

  return (
    <div className="flex flex-wrap justify-around overflow-y-scroll mt-[20px] pb-24" style={{
      height: width <= 768 ? "calc(100vh - 230px)" : "calc(100vh - 170px)"
    }}>
      {
        filteredBrands.map((vendor, index) => {
          return (
            <Link href={`/shop/brand/${vendor.docID}`} key={index} className="w-[200px] max-w-[48%] lg:w-[24%] relative text-black mb-5">
              <div className={`w-full h-[150px] lg:h-[10vw] overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
                <Image
                  src={vendor.logo}
                  alt={'search icon'}
                  width={300}
                  height={300}
                  priority
                  className={`object-contain h-full`}
                />
              </div>
              <p className="relative font-bold">{vendor.name}</p>
            </Link>
          )
        })
      }
    </div>
  );
}

export default Brands;