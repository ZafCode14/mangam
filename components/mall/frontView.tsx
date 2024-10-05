import Image from "next/image";
import { useState } from "react";
import MiddleView from "./middleView";

interface FrontView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  frontView: string;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
  showFront: boolean;
}
function FrontView({ vendor, frontView, setShowFront, showFront }:FrontView) {
  const style = vendor.vendor.chosenShopStyle.split('/')[3] 
  const [showMiddle, setShowMiddle] = useState<boolean>(false);

  return (
    <div className="h-full w-full absolute z-30 top-0"
    style={{
      opacity: showFront ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showFront ? "auto" : "none",
    }}
    >
      <Image
        src={frontView}
        alt="front view"
        width={2000}
        height={2000}
        className="object-cover h-full"
        style={{
          scale: showMiddle ? "150%" : "100%",
          transition: "1s ease",
        }}
      />      
      {/** Enter the shop button */}
      {style === "classic" ?
        <div 
        onClick={() => setShowMiddle(true)}
        className={`
          absolute z-20
          top-[5vw] left-[37vw]
          w-[27vw] h-[38vw]
          bg-[green] opacity-5
        `}>
        </div>
      :
        <div 
        onClick={() => setShowMiddle(true)}
        className={`
          absolute z-20
          top-[5vw] left-[3vw]
          w-[27vw] h-[38vw]
          bg-[green] opacity-5
        `}>
        </div>
      }
      {/** Enter the shop button */}
      <div 
      onClick={() => setShowFront(false)}
      className={`
        absolute z-20
        bottom-0 left-[37vw]
        w-[27vw] h-[9vw]
        bg-[red]
      `}>
        </div>
      <MiddleView
        vendor={vendor}
        middleView={vendor.middleView}
        showMiddle={showMiddle}
        setShowMiddle={setShowMiddle}
      />
    </div>
  );
}

export default FrontView;