import Image from "next/image";
import { Vendors } from "@/types/products";
import ContiueMall from "./contiueMall";
import Vendor from "./vendor";
import Perspective2 from "./perspective2";

interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  setMiddleButton: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
  middleButton: boolean;
  groupedVendors: GroupedVendors;
}

function Perspective1({ middleButton, setMiddleButton, setElev, floor, groupedVendors }: PerspectiveProp) {
  const vendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages: any = {};

  vendorCategories.forEach((category) => {
    // Adjust the corridor path for each category
    const corridorPathMap: Record<string, string> = {
      gold: `/images/mall/perspective1/gold/corridor.jpeg`,
      silver: `/images/mall/perspective1/silver/corridor.jpeg`,
      raw: `/images/mall/perspective1/raw/C-I.jpeg`,
    };

    if (groupedVendors[category]) {
      vendorImages[category] = {
        corridor: corridorPathMap[category], // Dynamically assign the corridor path
        vendor1: { mallView: `/images/mall/perspective1/${floor}/classic1.png` },
        vendor2: { mallView: `/images/mall/perspective1/${floor}/classic2.png` },
        vendor3: { mallView: `/images/mall/perspective1/${floor}/classic3.png` },
        vendor4: { mallView: `/images/mall/perspective1/${floor}/classic4.png` },
      };

      groupedVendors[category].forEach((vendor: Vendors, index: number) => {
        const shopStyle = vendor.chosenShopStyle.split('/')[3];
        const shopFloor = vendor.chosenShopStyle.split('/')[2];
        // Reset index + 1 to cycle between 1 and 4
        const viewIndex = (index % 4) + 1;

        vendorImages[category][`vendor${index + 1}`] = {
          vendor: vendor,
          mallView: `/images/mall/perspective1/${shopFloor}/${shopStyle}${viewIndex}.png`,
          frontView: `/images/mall/interior/${shopFloor}/${shopStyle}/front.jpeg`,
          rightView: `/images/mall/interior/${shopFloor}/${shopStyle}/right.jpeg`,
          leftView: `/images/mall/interior/${shopFloor}/${shopStyle}/left.jpeg`,
          middleView: `/images/mall/interior/${shopFloor}/${shopStyle}/middle.jpeg`,
          endView: `/images/mall/interior/${shopFloor}/${shopStyle}/end.jpeg`,
          banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
        };
      });
    }
  });

  if (floor === "raw") {
    return (
      <div
        className={`relative h-full w-screen flex justify-center items-center overflow-hidden`}
      >
        <div className="absolute h-full flex items-center justify-center"
        style={{
          width: middleButton ? "153vw" : "100vw",
          opacity: middleButton ? "0" : "1",
          transition: "1s ease",
        }}
        >
        <Image
          src={vendorImages.raw.corridor}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`absolute w-full object-cover`}
        />
        {/** P1 arrow */}
        <div className={`absolute w-full object-cover top-0 right-0`}>
          <Image
            src={`/images/mall/arrows/raw/P1.png`}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full`}
          />
        </div>

        {/** botton for the forward arrow P1 */}
        <div className="relative">
          <button
            onClick={() => {
              setMiddleButton(prev => !prev);
            }}
            className={`
              absolute top-[10vw] left-[-10vw]
              w-[15vw] h-[12vw] cursor-pointer
              z-10
            `} 
          ></button>
        </div>

        </div>
        <div className={`
          absolute
          z-30 w-full flex justify-center items-center
        `} style={{
          opacity: middleButton ? "1" : "0",
          transition: "1s ease",
          pointerEvents: middleButton ? "auto" : "none",
        }}>
          <Perspective2 
            setMiddleButton={setMiddleButton}
            groupedVendors={groupedVendors}
            setElev={setElev}
            floor={floor}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-screen flex justify-center items-center overflow-hidden`} >
      {/** Corridor */}
      <div className="absolute h-full flex items-center justify-center"
      style={{
        width: middleButton ? "153vw" : "100vw",
        opacity: middleButton ? "0" : "1",
        transition: "1s ease",
      }}
      >
      <Image
        src={vendorImages[floor].corridor}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />

      <Vendor 
        vendor={vendorImages[floor].vendor1}
        floor={floor}
        bannerClassName={`
          absolute top-[12vw] right-[10vw] z-20
          flex justify-center
          w-[20vw] h-[5vw]
        `}
        bannerStyle={{
          transform: "skewY(-22deg)"
        }}
        buttonClassName={`
          absolute top-[-49vw] right-[4vw]
          w-[32vw] h-[35vw] cursor-pointer
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)"
        }}
      />

      <Vendor 
        vendor={vendorImages[floor].vendor2}
        floor={floor}
        bannerClassName={`
          absolute top-[11vw] left-[10vw] z-20
          flex justify-center
          w-[20vw] h-[5vw]
        `}
        bannerStyle={{
          transform: "skewY(24deg)"
        }}
        buttonClassName={`
          absolute top-[-48.5vw] left-[4vw]
          w-[32vw] h-[35vw] cursor-pointer
          opacity-[0.4]
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(0% 0, 60% 30%, 100% 90%, 0 100%)"
        }}
      />

      <Vendor 
        vendor={vendorImages[floor].vendor3}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[19vw] right-[32.5vw] z-20
          w-[5vw] h-[2vw]
          flex justify-center
        `}
        bannerStyle={{
          transform: "skewY(-20deg)"
        }}
        buttonClassName={`
          absolute top-[-36vw] right-[32vw]
          w-[7vw] h-[15vw] cursor-pointer
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(0% 25%, 100% 0%, 100% 100%, 0 85%)"
        }}
      />

      <Vendor 
        vendor={vendorImages[floor].vendor4}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[18.3vw] left-[35vw] z-20
          w-[5vw] h-[2.3vw]
          flex justify-center
        `}
        bannerStyle={{
          transform: "skewY(27deg)"
        }}
        buttonClassName={`
          absolute top-[-34vw] left-[35vw]
          w-[5vw] h-[12vw] cursor-pointer
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(0% 0, 100% 20%, 100% 87%, 0 100%)"
        }}
      />

      {/** P1 arrow */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/arrows/${floor}/P1.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>

      <div className="w-full">

        {/** botton for the Elevator */}
        <div className="relative">
          <button
            onClick={() => setElev((prev) => !prev)}
            className={`
              absolute 
              left-[32vw] top-[-8vw] 
              h-[12vw] w-[4vw] 
              cursor-pointer
            `}
          ></button>
        </div>

        {/** botton for the forward arrow P1 */}
        <div className="relative">
          <button
            onClick={() => {
              setMiddleButton(prev => !prev);
            }}
            className={`
              absolute top-[6vw] left-[43vw]
              w-[15vw] h-[12vw] cursor-pointer
              z-10
            `} 
          ></button>
        </div>

        {/** Continue mall once */}
        {
          groupedVendors.gold.length > 4 &&
          <div className="relative">
            <button
              onClick={() => {
              }}
              className={`
                absolute top-[-6vw] left-[40vw]
                w-[21vw] h-[8vw] cursor-pointer
                overflow-hidden
                z-10
              `} 
            >
              <ContiueMall/>
            </button>
          </div>
        }

        {/** Continue mall twice */}
        {
          groupedVendors.gold.length > 8 &&
        <div className="relative">
          <button
            onClick={() => {
            }}
            className={`
              absolute top-[-2vw] left-[48.5vw]
              w-[4.5vw] h-[2vw] cursor-pointer
              overflow-hidden
              bg-[#9b9b098c]
              z-10
            `} 
          >
            <ContiueMall/>
          </button>
        </div>
        }
      </div>
      </div>

      <div className={`
        z-30 w-full flex justify-center items-center
      `} style={{
        opacity: middleButton ? "1" : "0",
        transition: "1s ease",
        pointerEvents: middleButton ? "auto" : "none",
      }}>
        <Perspective2 
          setMiddleButton={setMiddleButton}
          groupedVendors={groupedVendors}
          setElev={setElev}
          floor={floor}
        />
      </div>
    </div>
  );
}
export default Perspective1;