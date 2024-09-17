"use client"
import Link from "next/link";
import Image from "next/image";

function Header() {
    return (
        <header className={`
          fixed top-0 z-20
          flex justify-between items-center
          h-[70px] w-full bg-[#2A1C1B]
          text-white
        `}>
          <Link href={'/'} className="flex items-center">
            <Image
             src={'/icons/logo.png'}
             alt="logo"
             width={100}
             height={100}
             className="h-[40px] w-auto mx-3"
            />
          </Link>
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