"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Make sure this path points to your Firebase configuration
import { onAuthStateChanged, User } from "firebase/auth";
import useAuthUser from "@/hooks/user";

function Header() {
  const [theuser] = useAuthUser();
  const [user, setUser] = useState<User | null>(null); // Store the authenticated user
  const [cartCount, setCartCount] = useState(0); // Track the number of items in the cart
  const p = usePathname();

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, []);

  // Function to retrieve cart items from localStorage
  const getCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartItems.length); // Update the cart count
  };

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

  return (
    <header
      className={`
        fixed top-0 z-20
        flex justify-between items-center
        h-[80px] w-full bg-[#2A1C1B]
        text-white
      `}
    >
      <Link href={"/"} className="flex items-center">
        <Image
          src={"/icons/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="h-[60px] w-auto ml-16"
          priority
        />
      </Link>
      <div className="flex">
        <Link href="/" className={`mx-5 ${p === "/" && "text-[#C4A153]"}`}>
          Homepage
        </Link>
        <Link
          href={{ pathname: "/shop", query: { show: "brand" } }}
          className={`mx-5 ${p.startsWith("/shop") && "text-[#C4A153]"}`}
        >
          Shop Now
        </Link>
        <Link href="/mall" className={`mx-5 ${p.startsWith("/mall") && "text-[#C4A153]"}`}>
          Mall
        </Link>
        <div className="relative">
          <Link href="/cart" className={`mx-5 relative ${p.startsWith("/cart") && "text-[#C4A153]"}`}>
            Cart {cartCount > 0 && <span className="ml-1 absolute bg-[#C1A875] rounded-full w-5 h-5 text-[white] flex justify-center items-center -top-2 -right-5">{cartCount}</span>}
          </Link>
        </div>
      </div>
      {user ? (
        // Display round gray circle if user is authenticated
        <Link href={'/account?tab=wishlist'} className="flex items-center mx-5">
          <p className="w-[40px] h-[40px] bg-[white] rounded-full mr-10 text-black flex justify-center items-center text-[24px] font-bold">
            {theuser !== null && theuser.firstName.charAt(0).toUpperCase()}
          </p>
        </Link>
      ) : (
        // Display "Login/Sign up" if no user is authenticated
        <Link
          href="/login"
          className={`
            flex justify-center items-center
            mx-5 bg-[#C4A153]
            px-4 py-[3px]
            rounded-md text-[14px]
            font-bold
          `}
        >
          Login/Sign up
        </Link>
      )}
    </header>
  );
}

export default Header;