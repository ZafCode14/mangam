import Image from "next/image";
import useVendors from "@/hooks/vendors";
import Link from "next/link";
import Loading from "./loading";
import useWindowDimensions from "@/hooks/dimentions";

interface BrandProps {
  search: string;
}
function Brands({ search }:BrandProps) {
  const [vendors, loading] = useVendors();
  const {width} = useWindowDimensions();

  const filteredBrands = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!loading) {
    return (
      <div className="flex flex-wrap justify-around overflow-y-scroll mt-[20px]" style={{
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
  } else {
    return (
      <Loading/>
    )
  }
}

export default Brands;