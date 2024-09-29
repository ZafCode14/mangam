"use client";
import Elevator from "@/components/elevator";
import Perspective1 from "@/components/perspective1";
import Perspective2 from "@/components/perspective2";
import { useState } from "react";

function Page() {
  const [middleButton, setMiddleButton] = useState<boolean>(false);
  const [elev, setElev] = useState<boolean>(false);
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
      <Perspective2 
        setElev={setElev}
        floor={floor}
      />
      <Perspective1
        middleButton={middleButton}
        setElev={setElev}
        floor={floor}
      />
      <button
        onClick={() => {
          setMiddleButton(prev => !prev);
        }}
        className={`
          absolute 
          w-[200px]
          h-[150px]
          z-10
        `}
      ></button>
      <Elevator
        elev={elev}
        setElev={setElev}
        setFloor={setFloor}
        floor={floor}
        setMiddleButton={setMiddleButton}
      />
    </main>
  );
}

export default Page;