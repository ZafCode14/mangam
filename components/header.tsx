"use client"
import Link from "next/link";

function Header() {
    return (
        <header className={`
          fixed top-0
          flex justify-between items-center
          h-[70px] w-full bg-[#2A1C1B]
          text-white
        `}>
          <Link href="/" className={`mx-5`}>MANGAM</Link>
          <div>
            <Link href="/" className={`mx-5`}>Home</Link>
            <Link href="/shop" className={`mx-5`}>Shop</Link>
            <Link href="/mall" className={`mx-5`}>Mall</Link>
            <Link href="/" className={`mx-5`}>Cart</Link>
          </div>
          <Link href="/" className={`mx-5`}>Sign In</Link>
        </header>
    );
}

export default Header