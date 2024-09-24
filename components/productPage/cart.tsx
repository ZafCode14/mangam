import Image from "next/image";

interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}
interface Prop {
  setCart: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}
function AddToCart({ setCart, product }: Prop) {
  return (
    <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center top-0 right-0 bg-[#000000a1] z-10">
      <div className="w-[600px] h-[300px] bg-[#F5F5F5] rounded-md flex flex-col">
        {/* Header Section */}
        <div className="flex border-b border-[#bebebe] relative justify-center">
          <p
            onClick={() => setCart(false)}
            className="absolute left-5 top-4 text-[20px]"
          >
            &lt;
          </p>
          <p className="py-5">Added to Cart!</p>
        </div>

        {/* Item Section */}
        <p className="self-end mr-5 mb-10">View Cart</p>
        <div className="flex h-[80px] bg-[white] items-center justify-between">
          <Image
            alt='product image'
            src={product.images[0]}
            width={300}
            height={300}
            priority
            className='h-full w-auto object-contain ml-5'
          />
          <p>{product.name}</p>
          <p>{product.price} EGP</p>
          <div className="flex items-center">
            <div className="w-[15px] h-[15px] rounded-full bg-gray-300 flex items-center justify-center">
              <p>-</p>
            </div>
            <p className="mx-2">1</p>
            <div className="w-[15px] h-[15px] rounded-full bg-gray-300 flex items-center justify-center mr-5">
              <p>+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;