import Image from "next/image";
import ModernEnd from "./positions/modern/end";
import ClassicEnd from "./positions/classic/end";

interface EndView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  endView: string;
  setShowEnd: React.Dispatch<React.SetStateAction<boolean>>;
  showEnd: boolean;
}

function EndView({ vendor, endView, setShowEnd, showEnd }: EndView) {
  const shopStyle = vendor.vendor.chosenShopStyle.split('/')[3]

  return (
    <div className="h-full w-auto absolute z-30 top-0"
      style={{
        opacity: showEnd ? "1" : "0",
        transition: "1s ease",
        pointerEvents: showEnd ? "auto" : "none",
      }}
    >
      <Image
        src={endView}
        alt="end view"
        width={2000}
        height={2000}
        className="object-cover h-full"
      />
      {/** Enter the shop button */}
      <div
        onClick={() => setShowEnd(false)}
        className={`
          absolute z-20
          bottom-0 left-[37vw]
          w-[27vw] h-[9vw]
          bg-[red]
        `}
      >
      </div>
      {
        shopStyle === "classic" ?
        <ClassicEnd vendor={vendor}/> :
        <ModernEnd vendor={vendor}/>
      }
    </div>
  );
}

export default EndView;