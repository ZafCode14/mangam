import Image from "next/image";

interface FrontView {
  frontView: string;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
  showFront: boolean;
}
function FrontView({ frontView, setShowFront, showFront }:FrontView) {
  return (
    <div className="h-full w-full absolute z-20 top-0"
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
    </div>
  );
}

export default FrontView;