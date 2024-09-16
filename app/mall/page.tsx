"use client";
import Elevator from "@/components/elevator";
import Perspective1 from "@/components/perspective1";
import Perspective2 from "@/components/perspective2";
import { useState } from "react";

function Page() {
  const [width, setWidth] = useState<boolean>(true);
  const [opacity, setOpacity] = useState<boolean>(true);
  const [elev, setElev] = useState<boolean>(false);  // This is correct
  const [floor, setFloor] = useState<string>("gold");

  return (
    <main
      className={`
        relative 
        overflow-hidden 
        flex justify-center items-center
        w-full top-[70px] 
      `}
      style={{
        height: "calc(100vh - 70px)"
      }}
    >
      {floor === "gold" && <Perspective2/>} 
      <Perspective1
        opacity={opacity ? "100" : "0"}
        width={width ? "100" : "210"}
        setElev={setElev}
        floor={floor}
      />
      {floor === "gold" && 
      <button
        onClick={() => {
          setWidth(prev => !prev);
          setOpacity(prev => !prev);
        }}
        className={`
          absolute 
          w-[200px]
          h-[150px]
          z-10
        `}
      ></button>
      }
      <Elevator
        elev={elev}
        setElev={setElev}
        setFloor={setFloor}
        floor={floor}
      />
    </main>
  );
}

export default Page;