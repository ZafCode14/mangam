import Image from "next/image";
import Vendor from "./vendor";
import ContiueMall from "./contiueMall";

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
  const allVendors = Object.values(p2[floor]).slice(1)
  const sliceVendorSet = allVendors.slice(fromTo.from, fromTo.to).reverse();
  const vendorSet = sliceVendorSet.slice(2, 4).reverse();

  if (floor === "raw") {
  return (
    <div className={`
      absolute top-0
      flex items-center justify-center
      h-full w-full
    `}>
      <div className="absolute h-full w-full flex items-center justify-center" >
        <Image
          src={p2[floor].corridor}
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
              setZoomInButton(false);
            }}
            className={`
              absolute top-[8vw] left-[-8vw]
              w-[12vw] h-[12vw] cursor-pointer
              bg-[red]
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
          bannerClassName={`
            absolute top-[12vw] right-[10vw] 
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
          vendor={vendorSet[1] || {mallView: `/images/mall/perspective2/${floor}/classic2.png`}}
          floor={floor}
          bannerClassName={`
            absolute 
            top-[15vw] left-[24vw] 
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
                bg-[#ff000073]
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
                  bg-[#0080007c]
                `} 
              ></button>
            </div>
          }

          {/** Continue mall once */}
          {
            vendorSet.length > 0 &&
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