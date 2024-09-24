"use client";
import { useEffect, useState } from 'react';
import useProducts from '@/hooks/products';
import Image from 'next/image';
import useVendors from '@/hooks/vendors';
import Products from '@/components/products';
import Loading from '@/components/loading';
import useAuthUser from '@/hooks/user';
import { useRouter } from 'next/navigation';
import { putWishlist } from '@/components/wishlist/wishlist';

interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface Vendor {
  docID: string;
  name: string;
}

interface ProductPageProps {
  params: { 
    productId: string;
  };
}

const Page = ({ params }: ProductPageProps) => {
  const { productId } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null); // Set vendor state to null initially
  const [products, loading, error] = useProducts(); // Using your custom hook to fetch products
  const [vendors] = useVendors();
  const [isValidProductId, setIsValidProductId] = useState(false);
  const [theuser] = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !error && products.length > 0) {
      // Check if the productId exists in the list of products
      const foundProduct = products.find((product) => product.docID === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Find and set the corresponding vendor
        const foundVendor = vendors.find((vendor) => vendor.docID === foundProduct.brandDocID);
        setVendor(foundVendor || null); // If vendor is not found, set null
        setIsValidProductId(true);
      } else {
        setIsValidProductId(false); // productId not found
      }
    }
  }, [loading, error, products, productId, vendors]);

  const handleUnauthUser = (callback: () => void) => {
    if (!theuser) {
      router.push('/login');
    } else {
      callback();
    }
  }

  const handleWishlist = () => {
    const userId = theuser?.id;
    const productId = product?.docID;

    if (userId && productId) {
      putWishlist(userId, productId);
    }
  }

  const handleAppointment = () => {
    console.log("appointment clicked")
  }

  const handleCart = () => {
    console.log("cart clicked");
  }

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <p className='mt-[500px]'>Error loading products: {error.message}</p>; // Handle error case
  }

  if (!isValidProductId) {
    return <p className='mt-[500px]'>Product not found</p>; // Return a message if productId is invalid (or handle 404 if needed)
  }

  if (product !== null) {
    return (
      <main className={`flex flex-col items-center w-full mt-[70px]`}>
        <div className='w-[1200px]'>
          <p className='my-10'>{vendor?.name } / {product.category} / {product.name}</p>
          <div className='flex h-[500px]'>
            <div className='h-full w-[40%] overflow-hidden flex items-center justify-center bg-[white] mr-5 rounded-xl'>
              <Image
                alt='product image'
                src={product.images[0]}
                width={3000}
                height={3000}
                priority
                className='h-full object-contain'
              />
            </div>

            <div className='px-10 w-[60%] h-full flex flex-col items-center justify-between bg-[white] rounded-xl p-5'>
              <div className='flex items-end w-full justify-between relative'>
                <h2 className='text-[34px]'>{product.name}</h2>
                <p className='font-bold text-[20px]'>{product.price} EGP</p>
                <p className='absolute right-0 bottom-[-20px] line-through text-gray-400'>{product.price} EGP</p>
              </div>
              <div className='w-full flex flex-col text-center items-center'>
                <h5 className='font-bold'>Description</h5>
                <p>{product.description}</p>
              </div>
              <div className='flex justify-between w-full text-white'>
                <div>
                  <button onClick={() => handleUnauthUser(handleWishlist)} className='bg-[#2A1C1B] p-3 rounded-md'>Add to Whishlist</button>
                  <button onClick={() => handleUnauthUser(handleAppointment)} className='bg-[#2A1C1B] p-3 rounded-md ml-2'>Book Appointment</button>
                </div>
                <button onClick={() => handleUnauthUser(handleCart)} className='bg-gradient-to-r from-[#796640] via-[#C1A875] to-[#796640] p-3 rounded-md'>Add to Cart</button>
              </div>
            </div>

          </div>

          <div className='flex items-center mt-10'>
            <div className='border-t border-gray-400 flex-1'></div>
            <p className='mx-5'>More From {vendor?.name}</p>
            <div className='border-t border-gray-400 flex-1'></div>
          </div>
          <Products brandId={product.brandDocID} search={""} categories={[]} price={[0, 300000]} height={300}/>
        </div>
      </main>
    );
  }
  return <Loading/>;
};

export default Page;