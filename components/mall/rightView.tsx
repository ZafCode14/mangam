import Image from "next/image";

interface RightView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
  rightView: string;
  setShowRight: React.Dispatch<React.SetStateAction<boolean>>;
  showRight: boolean;
}

function RightView({ rightView, setShowRight, showRight }: RightView) {
  return (
    <div className="h-full w-auto absolute z-30 top-0"
      style={{
        opacity: showRight ? "1" : "0",
        transition: "1s ease",
        pointerEvents: showRight ? "auto" : "none",
      }}
    >
      <Image
        src={rightView}
        alt="right view"
        width={2000}
        height={2000}
        className="object-cover h-full"
      />
      {/** Enter the shop button */}
      <div
        onClick={() => setShowRight(false)}
        className={`
          absolute z-20
          bottom-0 left-[37vw]
          w-[27vw] h-[9vw]
          bg-[red]
        `}
      >
      </div>
    </div>
  );
}

export default RightView;