import Image from "next/image";
import Vendor from "./vendor";
import ContiueMall from "./contiueMall";
import { useState } from "react";
import FrontView from "./frontView";
import ContinueRawMall from "./continueRawMall";

interface PerspectiveProp {
  setZoomInButton: React.Dispatch<React.SetStateAction<boolean>>;
  zoomInButton: boolean;
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p2: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p1: any;
  fromTo: {from: number, to: number}
  setFromTo: React.Dispatch<React.SetStateAction<{from: number, to: number}>>;
}
function Perspective2({ fromTo, setFromTo, setZoomInButton, setElev, floor, p2, p1 }: PerspectiveProp) {
  const [showFrontRaw, setShowFrontRaw] = useState<boolean>(false);
  const allVendors = Object.entries(p2[floor])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, _]) => !key.startsWith("cor"))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, value]) => value); 
  const sliceVendorSet = allVendors.slice(fromTo.from, fromTo.to).reverse();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorSet: any = sliceVendorSet.slice(2, 4).reverse();

  console.log(p2);
  if (floor === "raw") {
  return (
    <div className={`
      absolute
      flex justify-center items-center
      h-full w-full
    `}>
        <Image
          src={p2.raw[`corridor${fromTo.from}`]}
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

        {/** Continue mall once */}
        {
          fromTo.to < allVendors.length * 2 &&
          <div className={`
          absolute flex justify-center pointer-events-none
          bottom-[20vw] left-[38vw] overflow-hidden
          w-[22vw] h-[14vw]
          `}>
            <div
              className={`
                min-w-[30vw] h-[10vw] cursor-pointer
              `} 
            >
              <ContinueRawMall/>
            </div>
          </div>
        }

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

        {/** botton for the Elevator */}
        <div className={`
          absolute 
          left-[5vw] bottom-[5vw] 
        `}>
          <button
            onClick={() => setElev((prev) => !prev)}
            className={`
              h-[40vw] w-[30vw] 
              cursor-pointer
            `}
          ></button>
        </div>

        {/** botton for the backwards arrow P2 */}
        <div className={`
          absolute bottom-[2vw] left-[42vw]
        `}>
          <button
            onClick={() => {
              setZoomInButton(false);
            }}
            className={`
              w-[12vw] h-[12vw] cursor-pointer
            `} 
          ></button>
        </div>

        {/** botton go to next set of perspectives */}
        {
          fromTo.to < allVendors.length * 2 &&
          <div className={`
            absolute bottom-[10vw] left-[42vw]
          `}>
            <button
              onClick={() => {
                setZoomInButton(false);
                setFromTo({from: fromTo.to, to: fromTo.to + 2})
              }}
              className={`
                w-[12vw] h-[8vw] cursor-pointer
              `} 
            ></button>
          </div>
        }


        {/** botton for the right close vendor */}
        {
          p2.raw[`vendor${fromTo.from + 2}`] && 
          <div className={`
            absolute bottom-[5vw] right-[4vw]
          `}>
            <button
              onClick={() =>{
                setShowFrontRaw(true);
              }}
              className={`
                w-[38vw] h-[50vw] cursor-pointer
              `} 
              style={{
                clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)"
              }}
              disabled={!p2.raw[`vendor${fromTo.from + 2}`].frontView}
            ></button>
          </div>
        }

        {p2.raw[`vendor${fromTo.from + 2}`] &&
          <FrontView
            vendor={p2.raw[`vendor${fromTo.from + 2}`] || {mallView: `/images/mall/perspective2/raw/i.jpeg`}}
            frontView={p2.raw[`vendor${fromTo.from + 2}`].frontView}
            setShowFront={setShowFrontRaw}
            showFront={showFrontRaw}
          />
        }
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
          src={p2[floor].corridor}
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
          vendor={vendorSet[0] || {mallView: `/images/mall/perspective2/${floor}/classic1.png`}}
          floor={floor}
          bannerClassName={vendorSet[0]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ? `
            absolute top-[12.3vw] right-[11.3vw] z-20
            flex justify-center
            w-[20vw] h-[5vw]
          ` : `
            absolute top-[10.5vw] right-[12.5vw] z-20
            flex justify-center
            w-[15vw] h-[6vw]
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
          vendor={vendorSet[1] || {mallView: `/images/mall/perspective2/${floor}/classic2.png`}}
          floor={floor}
          bannerClassName={vendorSet[0]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ? `
            absolute z-20
            top-[15vw] left-[27.2vw] 
            flex justify-center
            w-[8vw] h-[5vw]
          ` : `
            absolute z-20
            top-[15vw] left-[22.5vw] 
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
        {
          Object.keys(p2[floor]).length < 5 ?
        <div className={`absolute w-full object-cover`}>
          <Image
            src={`/images/mall/arrows/${floor}/P2.png`}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full`}
          />
        </div>
          :
        <div className={`absolute w-full object-cover`}>
          <Image
            src={`/images/mall/arrows/${floor}/P22.png`}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full`}
          />
        </div>
        }

          {/** botton for the Elevator */}
          <div className="relative">
            <button
              onClick={() => setElev((prev) => !prev)}
              className={`
                absolute 
                right-[18vw] top-[9vw] 
                h-[5vw] w-[30vw] 
                cursor-pointer
              `}
            ></button>
            <button
              onClick={() => setElev((prev) => !prev)}
              className={`
                absolute 
                right-[30vw] top-[-20vw] 
                h-[30vw] w-[20vw] 
                cursor-pointer
              `}
            ></button>
          </div>

          {/** botton for the backwards arrow P2 */}
          <div className="relative">
            <button
              onClick={() => {
                setZoomInButton(false);
              }}
              className={`
                absolute top-[15vw] left-[-5vw]
                w-[12vw] h-[9vw] cursor-pointer
              `} 
            ></button>
          </div>

          {/** botton go to next set of perspectives */}
          {
            fromTo.to < allVendors.length &&
            <div className="relative">
              <button
                onClick={() => {
                  setZoomInButton(false);
                  setFromTo({from: fromTo.to, to: fromTo.to + 4})
                }}
                className={`
                  absolute top-[3vw] left-[-5vw]
                  w-[12vw] h-[8vw] cursor-pointer
                `} 
              ></button>
            </div>
          }

          {/** Continue mall once */}
          {
            fromTo.to < vendorSet.length &&
            <div className="relative">
              <div
                onClick={() => {
                }}
                className={`
                  absolute 
                  top-[-8.9vw] right-[-17.6vw]
                  w-[32.6vw] h-[12.5vw] 
                  cursor-pointer overflow-hidden
                `} 
              >
                <ContiueMall floor={floor} p1={p1} fromTo={fromTo}/>
              </div>
            </div>
          }
      </div>
  );
}

export default Perspective2;