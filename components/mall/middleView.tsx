import Image from "next/image";
import { useState } from "react";
import LeftView from "./leftView";
import EndView from "./endView";
import RightView from "./rightView";
import ModernEnd from "./positions/modern/end";
import ModernMiddle from "./positions/modern/middle";
import ClassicEnd from "./positions/classic/end";
import ClassicMiddle from "./positions/classic/middle";
import ClassicCenter from "./positions/classic/center";

interface MiddleView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  middleView: string;
  setShowMiddle: React.Dispatch<React.SetStateAction<boolean>>;
  showMiddle: boolean;
}
function MiddleView({ vendor, middleView, setShowMiddle, showMiddle }:MiddleView) {
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(false);

  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
    style={{
      opacity: showMiddle ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showMiddle ? "auto" : "none",
    }}
    >
      <LeftView
        vendor={vendor}
        leftView={vendor.leftView}
        showLeft={showLeft}
        setShowLeft={setShowLeft}
      />
      <EndView
        vendor={vendor}
        endView={vendor.endView}
        showEnd={showEnd}
        setShowEnd={setShowEnd}
      />
      <RightView
        vendor={vendor}
        rightView={vendor.rightView}
        showRight={showRight}
        setShowRight={setShowRight}
      />

      <div className="h-full w-full" style={{
        scale: showEnd || showLeft || showRight ? "150%" : "100%", // Only scale
        transformOrigin: showLeft
          ? "left center" // Zoom from the left
          : showRight
          ? "right center" // Zoom from the right
          : "center", // Zoom from the center (end view)
        transition: "1s ease",
      }}>
        <Image
          src={middleView}
          alt="front view"
          width={2000}
          height={2000}
          className="object-cover h-full"
        />      
        {/** Enter the shop button */}
        <div className={`
          absolute z-20
          flex
          top-[5vw] left-0
          w-full h-[38vw]
        `}>

          <div 
          onClick={() => setShowLeft(true)}
          className="h-full flex-[.7]"></div>

          <div 
          onClick={() => setShowEnd(true)}
          className="h-full flex-1"></div>

          <div 
          onClick={() => setShowRight(true)}
          className="h-full flex-[.7] "></div>

          </div>
        {/** Enter the shop button */}
        <div 
        onClick={() => setShowMiddle(false)}
        className={`
          absolute z-20
          bottom-0 left-[37vw]
          w-[27vw] h-[9vw]
          bg-[red]
        `}>
        </div>

        {/** Display The End Items */}
        {
        shopStyle === "classic" ?
          <div className="relative top-[-11.5vw] right-[0.2vw]" style={{
            scale: "55%",
          }}>
            <ClassicEnd vendor={vendor}/>
          </div> :
          <div className="relative top-[-12.8vw] right-[2.8vw]" style={{
            scale: "60%",
          }}>
            <ModernEnd vendor={vendor}/>
          </div>
        }

        { 
        shopStyle === "classic" &&
            <ClassicCenter vendor={vendor}/>
        }

        {
          shopStyle === "classic" ?
          <ClassicMiddle vendor={vendor}/> :
          <ModernMiddle vendor={vendor}/>
        }
      </div>
    </div>
  );
}

export default MiddleView;