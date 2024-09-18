import Image from "next/image";
import useVendors from "@/hooks/vendors";
import Link from "next/link";
import Loading from "./loading";

interface BrandProps {
  search: string;
}
function Brands({ search }:BrandProps) {
  const [vendors, loading] = useVendors();

  const filteredBrands = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!loading) {
    return (
      <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
        height: "calc(100vh - 240px)"
      }}>
        {
          filteredBrands.map((vendor, index) => (
            <Link href={`/shop/brand/${vendor.docID}`} key={index} className="w-[200px] mx-1 relative text-black mb-10">
              <div className={`w-full h-[140px] overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
                <Image
                  src={vendor.logo}
                  alt={'search icon'}
                  width={300}
                  height={300}
                  priority
                  className={`object-contain h-full`}
                />
              </div>
              <p className="relative">{vendor.name}</p>
            </Link>
          ))
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