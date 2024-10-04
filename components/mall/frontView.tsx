import Image from "next/image";

interface FrontView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  frontView: string;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
  showFront: boolean;
}
function FrontView({ vendor, frontView, setShowFront, showFront }:FrontView) {
  const style = vendor.vendor.chosenShopStyle.split('/')[3] 

  return (
    <div className="h-full w-full absolute z-30 top-0"
    onClick={() => setShowFront(false)}
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
      />      
      {/** Enter the shop button */}
      {style === "classic" ?
        <div className={`
          absolute z-20
          top-[5vw] left-[37vw]
          w-[27vw] h-[38vw]
        `}>
        </div>
      :
        <div className={`
          absolute z-20
          top-[5vw] left-[3vw]
          w-[27vw] h-[38vw]
        `}>
        </div>
      }
    </div>
  );
}

export default FrontView;