"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const p = usePathname();
  return (
      <header className={`
        fixed top-0 z-20
        flex justify-between items-center
        h-[80px] w-full bg-[#2A1C1B]
        text-white
      `}>
        <Link href={'/'} className="flex items-center">
          <Image
            src={'/icons/logo.png'}
            alt="logo"
            width={100}
            height={100}
            className="h-[60px] w-auto ml-16"
          />
        </Link>
        <div>
          <Link href="/" className={`mx-5 ${p === "/" && "text-[#C4A153]"}`}>Homepage</Link>
          <Link href={{pathname: '/shop', query: {show: "brand"}}} className={`mx-5 ${p.startsWith('/shop') && "text-[#C4A153]"}`}>Shop Now</Link>
          <Link href="/mall" className={`mx-5 ${p.startsWith('/mall') && "text-[#C4A153]"}`}>Mall</Link>
          <Link href="/cart" className={`mx-5 ${p.startsWith('/cart') && "text-[#C4A153]"}`}>Cart</Link>
        </div>
        <Link href="/" className={`
          flex justify-center items-center
          mx-5 bg-[#C4A153]
          px-4 py-[3px]
          rounded-md text-[14px]
          font-bold
        `}>Login/Sign up</Link>
      </header>
  );
}

export default Header