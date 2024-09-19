import Image from "next/image";
import Link from "next/link";
import useVendors from "@/hooks/vendors";

export interface Product {
  name: string;
  images: string[];
  docID: string;
  price: number;
  description: string;
  brandDocID: string;
}

export interface Prop {
  product: Product;
  res: number;
}
function Product({ product, res }:Prop) {
  const [vendors] = useVendors()
  const brand = vendors.find((vendor) => vendor.docID === product.brandDocID);

  return (
    <Link href={`/shop/product/${product.docID}`} className="w-full h-full relative text-black">
      <div className={`w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
        <Image
          src={product.images[0]}
          alt={'search icon'}
          width={res}
          height={res}
          priority
          className={`object-contain h-full`}
        />
      </div>
      <p className="relative font-bold leading-[16px] mt-[5px]">{product.name}</p>
      <p className="relative text-[12px]">{brand?.name}</p>
      <p className="relative text-[12px]">{product.price} EGP</p>
    </Link>
  );
}

export default Product;