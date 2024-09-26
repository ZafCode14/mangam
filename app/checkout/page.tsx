"use client";
import CheckoutForm from "@/components/checkout/form";
import { firestore } from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types for product and cart items
interface Product {
  name: string;
  price: number;
  images: string[];
}

interface CartItem {
  product: Product;
  amount: number;
}

interface FormData {
  country: string;
  governate: string;
  city: string;
  postalCode: string;
  apartment: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    country: '',
    governate: '',
    city: '',
    postalCode: '',
    apartment: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [confirmedAddress, setConfirmedAddress] = useState(false);
  const [user, setUser] = useState<User | null>(null); // User is from Firebase Auth
  const auth = getAuth();
  const router = useRouter();

  // Function to get cart items from localStorage with proper type handling
  const getCartItems = (): CartItem[] => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(cart);
        if (Array.isArray(parsedCart)) {
          return parsedCart.map((item) => {
            const { product, amount } = item;
            return { product, amount };
          });
        }
      } catch (error) {
        console.error("Error parsing cart items from localStorage", error);
      }
    }
    return [];
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user when authenticated
      } else {
        setUser(null); // Handle case where user is not authenticated
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [auth]);

  useEffect(() => {
    // Fetch cart items from localStorage when the component mounts
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.amount,
    0
  );

  // Define gem discount (e.g., 10% discount)
  const gemDiscount = subtotal * 0.1; // 10% discount

  // Define flat delivery fee
  const deliveryFee = 50; // Flat delivery fee in EGP

  // Calculate total price after discount and adding delivery fee
  const totalPrice = subtotal - gemDiscount + deliveryFee;

  // handle on click payment
  const handlePayment = async () => {
    if (user) {
      const userId = user.uid;

      const now = new Date();
      const estimatedArrival = new Date();
      estimatedArrival.setDate(now.getDate() + 2);

      const orderData = {
        userId: userId,
        address: formData,
        products: cartItems.map((product) => ({
          quantity: product.amount,
          product: product.product,
        })),
        price: {
          subtotal: subtotal,
          total: totalPrice,
          discount: gemDiscount,
          delivery: deliveryFee,
        },
        status: "pending",
        paymentMethod: "cash",
        createdAt: Timestamp.now(),
        estimatedArrival: estimatedArrival,

      };
      try {
        await addDoc(collection(firestore, 'usersOrders'), orderData);
        localStorage.clear();
        window.dispatchEvent(new Event("cart-updated"));
        console.log("Order created successfully!", orderData);
        router.push('/account?tab=orders')
      } catch (error) {
        console.error(error);
      } 
    }
  }

  return (
    <main className="flex justify-center bg-[#FFFFFF] h-[100vh] overflow-hidden">
        <div className="flex-col w-full mx-32 h-full mt-32">
          <p className="mb-2">Delivery Address</p>
          <div className="flex w-full h-full">
            <div className="w-full">
              <CheckoutForm 
              setConfirmedAddress={setConfirmedAddress} 
              confirmedAddress={confirmedAddress}
              formData={formData}
              setFormData={setFormData}
              />
            </div>

            {/* Price Breakdown */}
            <div className="w-[35%] flex flex-col items-center">
              <div className="flex flex-col ml-5 w-full bg-[#F1F1F1] p-5 rounded-md justify-center">
                {/* Sub Total */}
                <div className="flex justify-between mb-4 text-[20px]">
                  <p>Subtotal</p>
                  <p>{subtotal.toFixed(2)} EGP</p>
                </div>

                {/* Gem Discount */}
                <div className="flex justify-between mb-4">
                  <p>Gem Discount</p>
                  <p>-{gemDiscount.toFixed(2)} EGP</p>
                </div>

                {/* Delivery */}
                <div className="flex justify-between mb-4">
                  <p>Delivery</p>
                  <p>{deliveryFee} EGP</p>
                </div>

                <div className="border-b border-[#c9c9c9] mb-4"></div>

                {/* Total */}
                <div className="flex justify-between font-bold text-lg">
                  <p>Total Price</p>
                  <p>{totalPrice.toFixed(2)} EGP</p>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                className={`mt-10 py-3 w-[200px] ${confirmedAddress ? "bg-[#C1A875]" : "bg-[#c0c0c0]"}  text-white rounded-md`}
                disabled={!confirmedAddress}
              >Proceed to Payment</button>
            </div>

          </div>
        </div>
    </main>
  );
}

export default Page;