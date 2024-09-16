"use client";
import Perspective1 from "@/components/perspective1";
import Perspective2 from "@/components/perspective2";
import { useState } from "react";

function Page() {
  const [width, setWidth] = useState(true);
  const [opacity, setOpacity] = useState(true)

  return (
    <main className={`
      relative 
      overflow-hidden 
      flex justify-center items-center
      w-full top-[70px] 
    `} style={{
      height: "calc(100vh - 70px)"
    }}>
    <Perspective2/>
    <Perspective1
      opacity={opacity ? "100" : "0"}
      width={width ? "100" : "210"}
    />
    <button onClick={() => {setWidth(prev => !prev), setOpacity(prev => !prev)}} className={`
      absolute 
      w-[200px]
      h-[150px]
    `}> </button>
    </main>
  );
}

export default Page;