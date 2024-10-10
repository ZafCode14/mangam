import Image from "next/image";
import ContiueMall from "./contiueMall";
import Vendor from "./vendor";
import Perspective2 from "./perspective2";
import ContinueRawMall from "./continueRawMall";
import FrontView from "./frontView";
import { useState } from "react";

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  setZoomInButton: React.Dispatch<React.SetStateAction<boolean>>;
  zoomInButton: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p1: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p2: any;
  floor: string;
  fromTo: {from: number, to: number}
  setFromTo: React.Dispatch<React.SetStateAction<{from: number, to: number}>>;
}

function Perspective1({ fromTo, setFromTo, zoomInButton, setZoomInButton,  setElev, floor, p1, p2 }: PerspectiveProp) {
  const [activeVendor, setActiveVendor] = useState(1);
  const [showFrontRaw, setShowFrontRaw] = useState<boolean>(false);
  const vendors = Object.entries(p1[floor])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([key, _]) => !key.startsWith("cor"))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(([_, value]) => value); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorSet: any = vendors.slice(fromTo.from, fromTo.to)
  console.log(p1);

  if (floor === "raw") {
    return (
      <div
        className={`relative h-[50vw] w-full flex justify-center items-center overflow-hidden`}
      >
        {/** Perspective 2 */}
        <div className={`
          w-full h-full flex justify-center items-center relative
        `}>
          <Perspective2 
            zoomInButton={zoomInButton}
            setZoomInButton={setZoomInButton}
            p2={p2}
            p1={p1}
            fromTo={fromTo}
            setFromTo={setFromTo}
            setElev={setElev}
            floor={floor}
          />
        </div>

        <div className="absolute h-full w-full flex items-center justify-center"
        style={{
          scale: zoomInButton ? "160%" : "100%",
          opacity: zoomInButton ? "0" : "1",
          transition: "1s ease",
          pointerEvents: !zoomInButton ? "auto" : "none",
        }}
        >
          <Image
            src={p1.raw[`corridor${fromTo.to / 2}`]}
            alt="floor plan"
            width={3000}
            height={3000}
            priority
            className={`absolute w-full object-cover`}
          />

          {/** Continue mall once */}
          {
            fromTo.to < vendors.length &&
            <div className={`
              absolute flex justify-center pointer-events-none
              bottom-[20vw] left-[42vw] overflow-hidden
              w-[15vw] h-[14vw]
            `}>
              <div
              className={`
                min-w-[34vw] h-[10vw] cursor-pointer
              `} 
              >
                <ContinueRawMall/>
              </div>
            </div>
          }

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

          {/** botton for the Elevator */}
          <div className={`
            absolute 
            left-[30vw] top-[10vw] 
          `}>
            <button
              onClick={() => setElev((prev) => !prev)}
              className={`
                h-[25vw] w-[10vw] 
                cursor-pointer
              `}
            ></button>
          </div>

          {/** botton for the forward arrow P1 */}
          <div className={`
            absolute bottom-[10vw] left-[40vw]
          `}>
            <button
              onClick={() => {
                setZoomInButton(prev => !prev);
              }}
              className={`
                w-[15vw] h-[12vw] cursor-pointer
              `} 
            ></button>
          </div>

          {/** button go to the prev set */}
          {
            fromTo.to * 2 < vendors.length &&
            <div className={`
              absolute 
              bottom-[0vw] left-[40vw]
            `}>
              <button
                onClick={() => {
                  setZoomInButton(prev => !prev);
                  setFromTo({from: fromTo.from - 2, to: fromTo.from})
                }}
                className={`
                  w-[15vw] h-[12vw] cursor-pointer
                  bg-[red]
                `} 
              ></button>
            </div>
          }

          {/** botton for the right close vendor */}
          {
            p1.raw[`vendor${fromTo.from + 1}`] && 
            <div className={`
                absolute bottom-[5vw] right-[5vw]
            `}>
              <button
                onClick={() =>{
                  setActiveVendor(1);
                  setShowFrontRaw(true);
                }}
                className={`
                  w-[34vw] h-[50vw] cursor-pointer
                `} 
                style={{
                  clipPath: "polygon(15% 39%, 100% 0%, 100% 100%, 0 95%)"
                }}
                disabled={!p1.raw[`vendor${fromTo.from + 1}`].frontView}
              ></button>
            </div>
          }

          {/** botton for the right far vendor */}
          {
            p1.raw[`vendor${fromTo.from + 2}`] &&
            <div className={`
              absolute bottom-[18vw] right-[36vw]
            `}>
              <button
                onClick={() => {
                  setActiveVendor(2);
                  setShowFrontRaw(true)
                }}
                className={`
                  w-[7vw] h-[14vw] cursor-pointer
                `} 
                disabled={!p1.raw[`vendor${fromTo.from + 2}`].frontView}
              ></button>
            </div>
          }

          {
            p1.raw[`vendor${fromTo.from + activeVendor}`] &&
            <FrontView 
              vendor={p1.raw[`vendor${fromTo.from + activeVendor}`] || {mallView: `/images/mall/perspective1/raw/C-I.jpeg`}}
              frontView={p1.raw[`vendor${fromTo.from + activeVendor}`].frontView}
              setShowFront={setShowFrontRaw}
              showFront={showFrontRaw}
            />
          }

        </div>

      </div>
    );
  }


  return (
    <div className={`relative h-[50vw] w-full flex justify-center items-center overflow-hidden`} >
      <div className={`
        w-full flex justify-center items-center relative
      `}>
        <Perspective2 
          zoomInButton={zoomInButton}
          setZoomInButton={setZoomInButton}
          p2={p2}
          p1={p1}
          fromTo={fromTo}
          setFromTo={setFromTo}
          setElev={setElev}
          floor={floor}
        />
      </div>

      <div className="absolute h-[50vw] w-full flex items-center justify-center overflow-hidden z-20"
      style={{
        scale: zoomInButton ? "160%" : "100%",
        opacity: zoomInButton ? "0" : "1",
        transition: "1s ease",
        pointerEvents: !zoomInButton ? "auto" : "none",
      }}
      >
        {/** Corridor */}
        <Image
          src={p1[floor].corridor}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`absolute w-full object-cover`}
        />

        <Vendor 
          vendor={vendorSet[0] || {mallView: `/images/mall/perspective1/${floor}/classic1.png`}}
          floor={floor}
          bannerClassName={vendorSet[0]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ? `
            absolute top-[12vw] right-[10vw] z-20
            flex justify-center
            w-[20vw] h-[5vw]
          ` : `
            absolute 
            flex justify-center
            top-[11vw] right-[10vw] z-20
            w-[17vw] h-[5vw]
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
          vendor={vendorSet[1] || {mallView: `/images/mall/perspective1/${floor}/classic2.png`}}
          floor={floor}
          bannerClassName={vendorSet[1]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ?`
            absolute 
            flex justify-center
            top-[12.5vw] left-[15vw] z-20
            w-[15vw] h-[5vw]
          ` : `
            absolute 
            flex justify-center
            top-[13vw] left-[20vw] z-20
            w-[12vw] h-[5vw]
          `}
          bannerStyle={{
            transform: "skewY(21deg)"
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
          vendor={vendorSet[2] || {mallView: `/images/mall/perspective1/${floor}/classic3.png`}}
          floor={floor}
          bannerClassName={vendorSet[2]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ? `
            absolute 
            top-[19.5vw] right-[33.1vw] z-20
            w-[5vw] h-[2vw]
            flex justify-center
          ` : `
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
          vendor={vendorSet[3] || {mallView: `/images/mall/perspective1/${floor}/classic4.png`}}
          floor={floor}
          bannerClassName={vendorSet[3]?.vendor?.chosenShopStyle.split('/')[3] === 'classic' ? `
            absolute 
            top-[20vw] left-[35.5vw] z-20
            w-[4vw] h-[2.3vw]
            flex justify-center
          ` : `
            absolute 
            top-[19vw] left-[36.9vw] z-20
            w-[3.2vw] h-[2.3vw]
            flex justify-center
          `}
          bannerStyle={{
            transform: "skewY(21deg)"
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

          {/** button for the forward arrow P1 */}
          <div className="relative">
            <button
              onClick={() => {
                setZoomInButton(prev => !prev);
              }}
              className={`
                absolute 
                top-[6vw] left-[43vw]
                w-[15vw] h-[12vw] cursor-pointer
              `} 
            ></button>
          </div>
          
          {/** button go to the prev set */}
          {
            fromTo.to > vendors.length &&
            <div className="relative">
              <button
                onClick={() => {
                  setZoomInButton(prev => !prev);
                  setFromTo({from: fromTo.from - 4, to: fromTo.from})
                }}
                className={`
                  absolute 
                  top-[15vw] left-[43vw]
                  w-[15vw] h-[12vw] cursor-pointer
                `} 
              ></button>
            </div>
          }

          {/** Continue mall once */}
          {
            fromTo.to < vendors.length &&
            <div className="relative">
              <div
                onClick={() => {
                }}
                className={`
                  absolute top-[-5.8vw] left-[40vw]
                  w-[21.2vw] h-[8.3vw] cursor-pointer
                  overflow-hidden
                  z-10
                `} 
              >
                <ContiueMall floor={floor} p1={p1} fromTo={fromTo}/>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
export default Perspective1;