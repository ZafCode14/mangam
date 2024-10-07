import Image from "next/image";
import { useState } from "react";
import MiddleView from "./middleView";
import ModernFront from "./positions/modern/front";
import ClassicFront from "./positions/classic/front";

interface FrontView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  frontView: string;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
  showFront: boolean;
}
function FrontView({ vendor, frontView, setShowFront, showFront }:FrontView) {
  const [showMiddle, setShowMiddle] = useState<boolean>(false);
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-full absolute z-30 top-0"
    style={{
      opacity: showFront ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showFront ? "auto" : "none",
    }}
    >
      <div className="w-full h-full" 
      style={{
        scale: showMiddle ? "150%" : "100%",
        transition: "1s ease",
      }}>
        <Image
          src={frontView}
          alt="front view"
          width={2000}
          height={2000}
          className="object-cover h-full"
        />      
        {/** Enter the shop button */}
        <div 
        onClick={() => setShowMiddle(true)}
        className={`
          absolute z-20
          top-[5vw] left-0
          w-full h-[38vw]
        `}>
        </div>
        {/** Exit the shop button */}
        <div 
        onClick={() => setShowFront(false)}
        className={`
          absolute z-20
          bottom-0 left-0
          w-full h-[12vw]
        `}>
        </div>
        {
          shopStyle === "classic" ?
          <ClassicFront vendor={vendor}/> :
          <ModernFront vendor={vendor}/>
        }
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