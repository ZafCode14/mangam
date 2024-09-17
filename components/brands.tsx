import Image from "next/image";
import useVendors from "@/hooks/vendors";
import Link from "next/link";

function Brands() {
  const [vendors] = useVendors(); // Use the hook
  return (
    <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
      height: "calc(100vh - 240px)"
    }}>
      {
        vendors.map((vendor, index) => (
          <Link href={`/shop/brand/${vendor.docID}`} key={index} className="w-[220px] mx-1 relative text-black mb-10">
            <div className={`w-full h-[140px] object-cover overflow-hidden flex justify-center items-center`}>
              <Image
                src={vendor.logo}
                alt={'search icon'}
                width={100}
                height={100}
                priority
                className={`w-full`}
              />
            </div>
            <p className="relative font-bold">{vendor.name}</p>
            <div>

            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default Brands;