import Image from "next/image";
import ModernLeft from "./positions/modern/left";
import ClassicLeft from "./positions/classic/left";

interface LeftView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  leftView: string;
  setShowLeft: React.Dispatch<React.SetStateAction<boolean>>;
  showLeft: boolean;
}
function LeftView({ vendor, leftView, setShowLeft, showLeft }:LeftView) {
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
    style={{
      opacity: showLeft ? "1" : "0",
      transition: "1s ease",
      pointerEvents: showLeft ? "auto" : "none",
    }}
    >
      <Image
        src={leftView}
        alt="front view"
        width={2000}
        height={2000}
        className="object-cover h-full"
      />      
      {/** Enter the shop button */}
      <div 
      onClick={() => setShowLeft(false)}
      className={`
        absolute z-20
        bottom-0 left-0
        w-full h-[12vw]
      `}>
      </div>
      {
        shopStyle === "classic" ?
        <ClassicLeft vendor={vendor}/> :
        <ModernLeft vendor={vendor}/>
      }
    </div>
  );
}

export default LeftView;