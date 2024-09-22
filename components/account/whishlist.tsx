import Link from "next/link";

function Whishlist() {
  return (
    <div className="w-full h-[300px] flex flex-col justify-center items-center">
      <p className="text-[#BF9944] mb-1">We’re pretty sure you’ll find something you like!</p>
      <Link href={"/shop"} className="text-[#85563C] underline">Shop Now</Link>
    </div>
  );
}

export default Whishlist;