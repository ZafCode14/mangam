import Image from "next/image";

interface elevProp {
  elev: boolean
  floor: string
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  setMiddleButton: React.Dispatch<React.SetStateAction<boolean>>;
  setFloor: React.Dispatch<React.SetStateAction<string>>;
}
function Elevator({ elev, setElev, setFloor, floor }: elevProp) {

  return (
    <div className={`
      absolute
      z-20
      top-[10%]
      flex flex-col justify-center
      w-[35vw] h-[80%] pb-10 px-10
      bg-[#ffffffb2]
    `}
    style={{
      opacity: elev ? "100" : "0",
      transition: "1s ease",
      pointerEvents: elev ? "auto" : "none",
    }}
    >
      <Image
        src={"/images/mall/elevator/goldFloor.png"}
        alt="gold"
        width={3000}
        height={3000}
        onClick={() => {
          setElev(prev => !prev)
          setFloor("gold")
        }}
        className={`
          object-cover
          cursor-pointer
          ${floor === "gold" && "mb-5"}
          ${floor !== "gold" && floor !== "raw" && "mb-5"}
        `}
        style={{
          transition: "0.8s ease"
        }}
      />
      <Image
        src={"/images/mall/elevator/silverFloor.png"}
        alt="silver"
        width={3000}
        height={3000}
        onClick={() => {
          setElev(prev => !prev);
          setFloor("silver");
        }}
        className={`
          object-cover
          cursor-pointer
        `}
        style={{
          marginBottom: !elev ? "400px" : "0px",
          marginTop: !elev ? "400px" : "0px",
          transition: "0.8s ease"
        }}
      />
      <Image
        src={"/images/mall/elevator/rawFloor.png"}
        alt="raw"
        width={3000}
        height={3000}
        onClick={() => {
          setElev(prev => !prev);
          setFloor("raw");
        }}
        className={`
          object-cover
          cursor-pointer
          ${floor !== "gold" && floor !== "raw" && "mt-5"}
          ${floor === "raw" && "mt-5"}
        `}
        style={{
          transition: "0.8s ease"
        }}
      />
    </div>
  )
}
export default Elevator;