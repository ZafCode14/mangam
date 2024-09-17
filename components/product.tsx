import Image from "next/image";

export interface Product {
  name: string;
  images: string[];
}

export interface Prop {
  product: Product;
}
function Product({ product }:Prop) {
  return (
    <div className="w-[220px] mx-1 relative text-black mb-10">
      <div className={`w-full h-[220px] object-cover overflow-hidden flex justify-center items-center`}>
        <Image
          src={product.images[0]}
          alt={'search icon'}
          width={100}
          height={100}
          priority
          className={`w-full`}
        />
      </div>
      <p className="relative font-bold">{product.name}</p>
    </div>
  );
}

export default Product;