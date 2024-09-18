import Image from "next/image";
import useVendors from "@/hooks/vendors";
import Link from "next/link";
import Loading from "./loading";

function Brands() {
  const [vendors, loading] = useVendors();

  if (!loading) {
    return (
      <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
        height: "calc(100vh - 240px)"
      }}>
        {
          vendors.map((vendor, index) => (
            <Link href={`/shop/brand/${vendor.docID}`} key={index} className="w-[220px] mx-1 relative text-black mb-10">
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
              <div>

              </div>
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