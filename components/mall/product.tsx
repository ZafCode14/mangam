"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/loading';
import useAuthUser from '@/hooks/user';
import { useRouter } from 'next/navigation';
import { putWishlist } from '@/components/wishlist/wishlist';
import AddToCart from '@/components/productPage/cart';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import CreateAppointment from '@/app/shop/product/[productId]/(appointments)/createAppointment';
import { Product, VendorBranch } from '@/types/products';

interface Vendor {
  docID: string;
  name: string;
  branchesNew: {[key: string]: VendorBranch}
}

interface ProductPageProps {
    productId: string;
}

const ProductPage = ({ productId }: ProductPageProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [appointment, setAppointment] = useState(false);
  const [cart, setCart] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [theuser] = useAuthUser();
  const [totalInStock, setTotalInStock] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      const totalStock = Object.values(product.branches)
        .map((branch) => branch.inStock)
        .reduce((acc, inStock) => acc + inStock, 0);
      setTotalInStock(totalStock);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  useEffect(() => {
    const getVendorandProduct = async () => {
      try {
        // Set loading to true at the beginning
        setLoading(true);

        // 1. Get product by product.docID
        const productRef = doc(firestore, "products", productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          console.log("No such product!");
          return;
        }

        const productData = productSnap.data() as Product;
        setProduct(productData);

        // 2. Get vendor by product.brandDocID
        const brandDocID = productData.brandDocID;
        const vendorRef = doc(firestore, "vendors", brandDocID);
        const vendorSnap = await getDoc(vendorRef);

        if (!vendorSnap.exists()) {
          console.log("No such vendor!");
          return;
        }

        const vendorData = vendorSnap.data() as Vendor;
        setVendor(vendorData);

      } catch (error) {
        console.error("Error fetching product or vendor:", error);
      } finally {
        // Set loading to false once data fetching is done
        setLoading(false);
      }
    };

    getVendorandProduct();
  }, [productId]);

  const handleUnauthUser = (callback: () => void) => {
    if (!theuser) {
      router.push('/login');
    } else {
      callback();
    }
  };

  const handleWishlist = () => {
    const userId = theuser?.id;
    const productId = product?.docID;

    if (userId && productId) {
      putWishlist(userId, productId);
    }
  };

  const handleAppointment = () => {
    setAppointment(true);
  };

  const handleCart = () => {
    setCart(true);
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  if (product !== null && vendor !== null) {
    return (
      <div className={`flex flex-col items-center w-full h-full bg-[#ececec] rounded-md`}>
        <div className='w-[1200px] max-w-full h-full'>
          <p className='mt-2 mb-5 ml-5'>{vendor?.name } / {product.category} / {product.name}</p>
          <div className='flex flex-col md:flex-row  relative px-3 h-[80%]'>
            {/** Product Image */}
            <div className={`
              h-full w-full md:w-[40%] 
              overflow-hidden flex items-center justify-center 
              bg-[white] mr-5 rounded-xl mb-5 md:mb-0
            `}>
              <Image
                alt='product image'
                src={product.images[0]}
                width={3000}
                height={3000}
                priority
                className='h-full object-contain'
              />
            </div>

            {/** Product description */}
            <div className='px-2 md:px-10 w-full md:w-[60%] h-full flex flex-col items-center justify-between bg-[white] rounded-xl p-5'>
              <div className='flex flex-col items-center w-full justify-between relative'>
                <h2 className='text-[28px] lg:text-[34px] mb-5'>{product.name}</h2>
                <p className='absolute right-0 bottom-[0px]'>{product.price} EGP</p>
                <p className='absolute right-0 bottom-[-20px] line-through text-gray-400'>{product.price} EGP</p>
              </div>
              <div className='w-full flex flex-col md:text-center items-center py-5 px-2'>
                <h5 className='font-bold'>Description</h5>
                <p>{product.description}</p>
              </div>
              <div className='flex justify-between w-full text-white'>
                <div className={`flex flex-col`}>
                  <button onClick={() => handleUnauthUser(handleWishlist)} className={`
                    bg-[#2A1C1B] 
                    text-[12px]
                    w-[140px] h-[40px]
                    rounded-md mb-2
                  `}>Add to Wishlist</button>
                  {
                    totalInStock > 0 &&
                    <button onClick={() => handleUnauthUser(handleAppointment)} className={`
                      bg-[#2A1C1B] 
                      text-[12px]
                      w-[140px] h-[40px]
                      rounded-md 
                    `}>Book Appointment</button>
                  }
                </div>
                {
                  totalInStock > 0 ?
                  <button onClick={() => handleUnauthUser(handleCart)} className={`
                    self-end
                    bg-gradient-to-r
                    from-[#796640] via-[#C1A875] to-[#796640] 
                    text-[12px]
                    w-[120px] h-[40px]
                    rounded-md
                  `}>Add to Cart</button> :
                  <p className='text-[red] flex items-center'>Out of Stock</p>
                }
              </div>
            </div>

            { appointment && 
              <CreateAppointment setAppointment={setAppointment} vendor={vendor} product={product}/> 
            }
            { cart && 
            <AddToCart setCart={setCart} product={product}/> 
            }

          </div>
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default ProductPage;