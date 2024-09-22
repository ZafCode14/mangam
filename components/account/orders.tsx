import { useState } from "react";
import Link from "next/link";

function Orders() {
  const [orderTab, setOrderTab] = useState<string>("orders");

  return (
    <div className="w-full">
      <div className="w-full flex">
        <p 
        onClick={() => setOrderTab("orders")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 cursor-pointer 
          ${orderTab === "orders" ? "border-b-2 font-bold" : "border-b"}
        `}>Orders</p>
        <p 
        onClick={() => setOrderTab("previous orders")} 
        className={`
          flex justify-center items-center cursor-pointer 
          w-[50%] border-black pb-1
          ${orderTab === "previous orders" ? "border-b-2 font-bold" : "border-b"}
        `}>Previous Orders</p>
      </div>
      <div className="flex flex-col justify-center items-center h-[200px]">
        {
          orderTab === "orders" 
          ?
          <div className="w-full h-[300px] flex flex-col justify-center items-center">
            <p className="text-[#BF9944] mb-1">Start shopping and make your first order!</p>
            <Link href={"/shop"} className="text-[#85563C] underline">Shop Now</Link>
          </div>
          : 
          <div className="w-full h-[300px] flex flex-col justify-center items-center">
            <p className="text-[#BF9944] mb-1">You currently have no delivered orders!</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Orders;