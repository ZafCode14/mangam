"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/lib/firebase";
import useWindowDimensions from "@/hooks/dimentions";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: {
    id: {
      country: string;
      governate: string;
      city: string;
      postalCode: string;
      apartment: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      address: string;
      addressId: string;
      id: string;
    }
  }
  defaultAddress: string;
  // Add other user properties as needed
}
function Header() {
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0); // Track the number of items in the cart
  const [isMounted, setIsMounted] = useState(false); // To ensure component is mounted
  const p = usePathname();

  const { height } = useWindowDimensions();

  // Function to retrieve cart items from localStorage
  const getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length); // Update the cart count
  };

  {/** Get user Info from the Users Table */}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserInfo({ id: userDoc.id, ...(userDoc.data() as Omit<User, 'id'>) });
          } else {
            setUserInfo(null); // User document does not exist
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        setUserInfo(null); // No authenticated user
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Initial load of cart items
  useEffect(() => {
    getCartItems(); // Retrieve cart count when component mounts

    // Listen to 'storage' event and 'cart-updated' event to detect changes in localStorage
    const handleStorageChange = () => {
      getCartItems(); // Update cart count when storage or cart is updated
    };

    window.addEventListener("cart-updated", handleStorageChange); // Listen to custom event

    return () => {
      window.removeEventListener("cart-updated", handleStorageChange); // Cleanup event listener
    };
  }, []);

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null if height < 450 and path is "/mall" (client-side only)
  if (!isMounted || (height < 450 && p === "/mall")) {
    return null;
  }

  return (
    <header
      className={`
        fixed top-0 z-30
        flex flex-col justify-center items-center
        md:flex-row md:justify-around
        h-[80px] w-full md:px-20
        bg-[#2A1C1B] text-white
      `}
    >
      <Link href={"/"} className={`
        relative
        top-2 md:top-0
        flex items-center justify-center
      `}>
        <Image
          src={"/icons/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className={`
            h-[30px] md:h-[40px] lg:h-[60px] w-auto
            md:mx-3
          `}
          priority
        />
      </Link>
      <div className="flex items-center flex-1 justify-around w-full">
        <div className="flex flex-1 justify-around md:justify-center">
          <Link href="/" className={`
            sm:mx-5 
            text-[14px] md:text-[16px]
            ${p === "/" && "text-[#C4A153]"}
            `}>
            Homepage
          </Link>
          <Link
            href={{ pathname: "/shop", query: { show: "brand" } }}
            className={`
              sm:mx-5 
              text-[14px] md:text-[16px]
              ${p.startsWith("/shop") && "text-[#C4A153]"}
            `}
          >
            Shop Now
          </Link>
          <Link href="/mall" className={`
            sm:mx-5 
            text-[14px] md:text-[16px]
            ${p.startsWith("/mall") && "text-[#C4A153]"}
          `}>
            Mall
          </Link>
          <div className="relative flex items-center">
            <Link href="/cart" className={`
              sm:mx-5 relative 
              text-[14px] md:text-[16px]
              ${p.startsWith("/cart") && "text-[#C4A153]"}
              `}>
              Cart {cartCount > 0 && <span className="ml-1 absolute bg-[#C1A875] rounded-full w-5 h-5 text-[white] flex justify-center items-center -top-2 -right-5">{cartCount}</span>}
            </Link>
          </div>
        </div>
        {user ? (
          // Display round gray circle if user is authenticated
          <Link href={'/account?tab=wishlist'} className="flex items-center mx-5">
            <p className={`
              sm:absolute right-10
              w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
              text-black bg-[white] 
              rounded-full md:mr-10 
              flex justify-center items-center 
              text-[16px] 
              font-bold
            `}>
              {user !== null && userInfo?.firstName.charAt(0).toUpperCase()}
            </p>
          </Link>
        ) : (
          // Display "Login/Sign up" if no user is authenticated
          <Link
            href="/login"
            className={`
              flex justify-center items-center
              mx-1 md:mx-5 bg-[#C4A153]
              px-2 md:my-2 py-[3px]
              rounded-md text-[10px] md:text-[14px]
              font-bold
            `}
          >
            Login/Sign up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;