import Image from "next/image";
import { Vendors } from "@/types/products";
import Vendor from "./vendor";
import ContiueMall from "./contiueMall";

interface PerspectiveProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupedVendors: GroupedVendors;
  setMiddleButton: React.Dispatch<React.SetStateAction<boolean>>;
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
}
interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}
function Perspective2({ setMiddleButton, setElev, floor, groupedVendors }: PerspectiveProp) {
  const vendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages2: any = {};

  vendorCategories.forEach((category) => {
    // Adjust the corridor path for each category
    const corridorPathMap: Record<string, string> = {
      gold: `/images/mall/perspective2/gold/corridor.jpeg`,
      silver: `/images/mall/perspective2/silver/corridor.jpeg`,
      raw: `/images/mall/perspective2/raw/i.jpeg`,
    };

    if (groupedVendors[category]) {
      vendorImages2[category] = {
        corridor: corridorPathMap[category], // Dynamically assign the corridor path
        vendor3: { mallView: `/images/mall/perspective2/${floor}/classic1.png` },
        vendor4: { mallView: `/images/mall/perspective2/${floor}/classic2.png` },
      };

      groupedVendors[category].forEach((vendor: Vendors, index: number) => {
        const shopStyle = vendor.chosenShopStyle.split('/')[3];
        const shopFloor = vendor.chosenShopStyle.split('/')[2];
        // Reset index + 1 to cycle between 1 and 4
        const viewIndex = (index % 2) + 1;

        vendorImages2[category][`vendor${index + 1}`] = {
          vendor: vendor,
          mallView: `/images/mall/perspective2/${shopFloor}/${shopStyle}${viewIndex}.png`,
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
    <div className={`
      absolute z-20 top-0
      h-full w-full
      flex items-center justify-center
    `}>
      <Image
        src={vendorImages2[floor].corridor}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`
          absolute
          object-cover
          w-full
        `}
      />
      {/** P2 arrow */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/arrows/raw/P2.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>

      {/** botton for the backwards arrow P2 */}
      <div className="relative">
        <button
          onClick={() => {
            setMiddleButton(prev => !prev);
          }}
          className={`
            absolute top-[8vw] left-[-8vw]
            w-[12vw] h-[12vw] cursor-pointer
          `} 
        ></button>
      </div>

      {/** botton for the Elevator */}
      <div className="relative">
        <button
          onClick={() => setElev((prev) => !prev)}
          className={`
            absolute 
            right-[18vw] top-[-18vw] 
            h-[40vw] w-[30vw] 
            cursor-pointer
          `}
        ></button>
      </div>

    </div>
  );
}
  return (
    <div className={`
      absolute
      flex justify-center items-center
      h-full w-full
    `}>
      <Image
        src={vendorImages2[floor].corridor}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`
          absolute
          w-full
          object-cover
        `}
      />
      <Vendor
        vendor={vendorImages2[floor].vendor3}
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
          absolute top-[-49vw] right-[9vw]
          w-[30vw] h-[35vw] cursor-pointer
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(20% 39%, 100% 0%, 100% 100%, 0 87%)"
        }}
      />

      <Vendor 
        vendor={vendorImages2[floor].vendor4}
        floor={floor}
        bannerClassName={`
          absolute 
          top-[15vw] left-[24vw] z-20
          flex justify-center
          w-[12vw] h-[5vw]
        `}
        bannerStyle={{
          transform: "skewY(20deg)"
        }}
        buttonClassName={`
          absolute 
          top-[-41vw] left-[20vw]
          w-[21vw] h-[23vw] cursor-pointer
          z-10
        `}
        buttonStyle={{
          clipPath: "polygon(0% 0%, 80% 35%, 100% 100%, 0 100%)"
        }}
      />

      {/** P2 arrow */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/arrows/${floor}/P2.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>

        {/** botton for the Elevator */}
        <div className="relative">
          <button
            onClick={() => setElev((prev) => !prev)}
            className={`
              absolute 
              right-[18vw] top-[9vw] 
              h-[5vw] w-[12vw] 
              cursor-pointer
            `}
          ></button>
        </div>

        {/** botton for the backwards arrow P2 */}
        <div className="relative">
          <button
            onClick={() => {
              setMiddleButton(prev => !prev);
            }}
            className={`
              absolute top-[10vw] left-[-4vw]
              w-[12vw] h-[12vw] cursor-pointer
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
  );
}

export default Perspective2;