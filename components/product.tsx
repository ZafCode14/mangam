import Image from "next/image";
import Link from "next/link";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendors: any[]; // Pass vendors from the parent component
}

function Product({ product, res, vendors }: Prop) {
  const vendor = vendors?.find((vendor) => vendor.docID === product.brandDocID); // Find the vendor based on brandDocID

  return (
    <Link href={`/shop/product/${product.docID}`} className="w-full h-full relative text-black">
      <div className={`w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
        <Image
          loading="lazy"
          src={product.images[0]}
          alt={'search icon'}
          width={res}
          height={res}
          className={`object-contain h-full`}
        />
      </div>
      <p className="relative font-bold leading-[16px] mt-[5px]">{product.name}</p>
      <p className="relative text-[12px]">{vendor?.name || 'Unknown Vendor'}</p> {/* Handle undefined vendor */}
      <p className="relative text-[12px]">{product.price} EGP</p>
    </Link>
  );
}

export default Product;