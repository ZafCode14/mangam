import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}
interface CartItem {
  product: Product; // The product object
  amount: number; // The quantity of the product in the cart
}
interface Prop {
  setCart: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}
function AddToCart({ setCart, product }: Prop) {
  const [amount, setAmount] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find(item => item.product.docID === product.docID); // Use your product's unique identifier

    if (existingProduct) {
      setAmount(existingProduct.amount); // Set amount to the existing amount in the cart
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    // Helper function to save product to localStorage
  const saveToLocalStorage = (product: Product, amount: number) => {
    // Get the existing cart from localStorage or initialize an empty array
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Find if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.product.docID === product.docID // Use a unique identifier for comparison (e.g., `product.id` if available)
    );

    if (existingProductIndex !== -1) {
      // If product already exists, update its amount
      const newAmount = cart[existingProductIndex].amount = amount;
      if (newAmount > 0) {
        cart[existingProductIndex].amount = newAmount; 
      } else {
        cart.splice(existingProductIndex, 1);
      }
    } else {
      // If product doesn't exist, add it to the cart
      cart.push({ product, amount });
    }
    

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Manually dispatch a custom event to notify other components of cart changes
    window.dispatchEvent(new Event("cart-updated"));
  };


  // Handle Quick Checkout
  const handleCheckout = () => {
    saveToLocalStorage(product, amount);
    router.push("/checkout"); // Redirect to the checkout page
  };

  // Handle Continue Shopping
  const handleContinue = () => {
    saveToLocalStorage(product, amount);
    setCart(false); // Close the cart modal
  };

  // Handle go to cart
  const handleCart = () => {
    saveToLocalStorage(product, amount);
    router.push("/cart"); // Redirect to the cart page
  };

  return (
    <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center top-0 right-0 bg-[#000000a1] z-10">
      <div className="w-[600px] bg-[#F5F5F5] rounded-md flex flex-col">
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
        <p onClick={handleCart} className="self-end mr-5 mb-10">View Cart</p>
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
            <div onClick={() => setAmount(prev => prev > 0 ? prev - 1 : prev)} className="w-[15px] h-[15px] rounded-full bg-gray-300 flex items-center justify-center">
              <p className="mb-1">-</p>
            </div>
            <p className="mx-2">{amount}</p>
            <div onClick={() => setAmount(prev => prev + 1)} className="w-[15px] h-[15px] rounded-full bg-gray-300 flex items-center justify-center mr-5">
              <p className="mb-[2px]">+</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end my-5 text-white">
          <button onClick={handleCheckout} className="py-3 px-5 bg-[#BF9944] rounded-md mr-2">Quick Checkout</button>
          <button onClick={handleContinue} className="py-3 px-5 bg-[#bf6b44] rounded-md mr-3">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;