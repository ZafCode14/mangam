import Image from "next/image";
import { Vendors } from "@/types/products";

interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}
interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
  middleButton: boolean;
  groupedVendors: GroupedVendors;
}

function Perspective1({ middleButton, setElev, floor, groupedVendors }: PerspectiveProp) {
  let corridor = "";
  let vendor1 = "";
  let vendor2 = "";
  let vendor3 = "";
  let vendor4 = "";
  let raw = "";

  if (groupedVendors.gold.length > 0) {
    if (floor === "gold") {
      corridor = `/images/mall/perspective1/corridor.jpeg`;
      vendor1 = `/images/mall/perspective1/${groupedVendors.gold[0]?.chosenShopStyle.split('/')[3] || "modern1"}1.png`;
      vendor2 = `/images/mall/perspective1/${groupedVendors.gold[1]?.chosenShopStyle.split('/')[3] || "modern2"}2.png`;
      vendor3 = `/images/mall/perspective1/${groupedVendors.gold[2]?.chosenShopStyle.split('/')[3] || "modern3"}3.png`;
      vendor4 = `/images/mall/perspective1/${groupedVendors.gold[3]?.chosenShopStyle.split('/')[3] || 'modern4'}4.png`;
    } else if (floor === "silver") {
      corridor = "/images/mall/Sperspective1/Corridor.jpeg";
      vendor1 = "/images/mall/Sperspective1/Modern1.png";
      vendor2 = "/images/mall/Sperspective1/Classic2.png";
      vendor3 = "/images/mall/Sperspective1/Classic3.png";
      vendor4 = "/images/mall/Sperspective1/Modern4.png";
    } else if (floor === "raw") {
      raw = "/images/mall/Rperspective1/C-I.jpeg";
    }
  }

  if (floor === "raw") {
    return (
      <div
        className={`absolute z-10 h-full`}
        style={{
          opacity: middleButton ? "1" : "0",
          width: middleButton ? "100vw" : "120vw",
          transition: "1s ease",
          pointerEvents: middleButton ? "auto" : "none", // Disable interaction when middleButton is false
        }}
      >
        <Image
          src={raw}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`absolute w-full object-cover`}
        />
        <button
          onClick={() => setElev((prev) => !prev)}
          className={`relative right-[-33vw] top-[10vw] h-[25vw] w-[8vw]`}
        ></button>
      </div>
    );
  }

  return (
    <div
      className={`absolute z-10 h-full flex justify-center items-center`}
      style={{
        opacity: middleButton ? "0" : "1",
        width: middleButton ? "150vw" : "100vw",
        transition: "1s ease",
        pointerEvents: middleButton ? "none" : "auto", // Disable interaction when opacity is 0
      }}
    >
      <Image
        src={corridor}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />
      {/** Left Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={vendor1}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
        <div className={`
          absolute top-[12vw] right-[10vw] z-20
          flex justify-center
          w-[20vw] h-[5vw]
        `} style={{
          transform: "skewY(-20deg)"
        }}>
          <Image
            src={"/icons/logo.png"}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full object-contain`}
          />
        </div>
      </div>

      {/** Right Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={vendor2}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Right Far  */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={vendor3}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Left Far */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={vendor4}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** P1 arrow */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={"/images/mall/perspective1/arrow.png"}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      <div className={`absolute w-full object-cover`}>
        <Image
          src={"/images/mall/perspective1/earrow.png"}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full scale-[45%]`}
        />
      </div>
      <button
        onClick={() => setElev((prev) => !prev)}
        className={`relative right-[17%] top-[-20px] h-[14vw] w-[4vw]`}
      ></button>
    </div>
  );
}

export default Perspective1;