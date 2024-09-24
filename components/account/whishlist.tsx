import Link from "next/link";
import { useEffect, useState } from "react";
import { getWishlist } from "../wishlist/wishlist";
import useAuthUser from "@/hooks/user";
import Loading from "../loading";
import getProductById from "../wishlist/productsById";
import Image from "next/image"; // Don't forget to import Image
import useVendors from "@/hooks/vendors";

function Whishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]); // State to hold product details
  const [theuser, loading] = useAuthUser();
  const userId = theuser?.id;

  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        try {
          const wl = await getWishlist(userId);
          setWishlist(wl);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchWishlist();
  }, [userId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productPromises = wishlist.map(async (productId) => {
        try {
          const product = await getProductById(productId); // Ensure this returns a promise
          return product; // Return the product data
        } catch (error) {
          console.error(`Error fetching product ${productId}: `, error);
          return null; // Return null for failed fetch
        }
      });

      const fetchedProducts = await Promise.all(productPromises); // Wait for all products to be fetched
      setProducts(fetchedProducts.filter(Boolean)); // Filter out any null values
    };

    if (wishlist.length > 0) {
      fetchProducts();
    }
  }, [wishlist]);

  const [vendors] = useVendors()

  if (loading) {
    return <Loading />;
  }

  if (products.length > 0) {

    return (
      <div className="flex w-full">
        {products.map((product, index) => {
          if (!product) return null; // Skip if product is null
          const brand = vendors.find((vendor) => vendor.docID === product.brandDocID);
          return (
            <Link key={index} href={`/shop/product/${product.docID}`} className="w-full h-[200px] relative text-black px-3">
              <div className={`w-full h-full object-cover overflow-hidden flex justify-center items-center bg-[white] rounded-md`}>
                <Image
                  src={product.images[0]}
                  alt={'search icon'}
                  width={400}
                  height={400}
                  priority
                  className={`object-contain h-full`}
                />
              </div>
              <p className="relative font-bold leading-[16px] mt-[5px]">{product.name}</p>
              <p className="relative text-[12px]">{brand?.name}</p>
              <p className="relative text-[12px]">{product.price} EGP</p>
            </Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="w-full h-[300px] flex flex-col justify-center items-center">
        <p className="text-[#BF9944] mb-1">We’re pretty sure you’ll find something you like!</p>
        <Link href={"/shop?show=product"} className="text-[#85563C] underline">Shop Now</Link>
      </div>
    );
  }
}

export default Whishlist;
