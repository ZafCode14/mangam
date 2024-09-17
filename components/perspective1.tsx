import Image from "next/image";

interface PerspectiveProp {
  width: string
  opacity: string
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string
}
function Perspective1({ opacity, width, setElev, floor }: PerspectiveProp) {
  let corridor = "";
  let classic1 = "";
  let classic2 = "";
  let classic3 = "";
  let classic4 = "";
  if (floor === "gold") {
    corridor = "/images/mall/perspective1/Corridor.jpeg"; 
    classic1 = "/images/mall/perspective1/Classic1.png"
    classic2 = "/images/mall/perspective1/Modern2.png"
    classic3 = "/images/mall/perspective1/Classic3.png"
    classic4 = "/images/mall/perspective1/Modern4.png"
  } else if (floor === "silver") {
    corridor = "/images/mall/Sperspective1/Corridor.jpeg"; 
    classic1 = "/images/mall/Sperspective1/Classic1.png"
    classic2 = "/images/mall/Sperspective1/Classic2.png"
    classic3 = "/images/mall/Sperspective1/Classic3.png"
    classic4 = "/images/mall/Sperspective1/Classic4.png"
  } else if (floor === "raw") {
    corridor = "/images/mall/perspective1/Floor.jpeg"; 
    classic1 = "/images/mall/perspective1/classic1.png"
    classic2 = "/images/mall/perspective1/classic2.png"
    classic3 = "/images/mall/perspective1/classic3.png"
    classic4 = "/images/mall/perspective1/classic4.png"
  }
  return (
    <div className={`
      absolute
      z-10
      flex items-center justify-center
      h-full 
    `} style={{
      opacity: `${opacity}`,
      width: `${width}vw`,
      transition: "1s ease"
    }}>
      <Image
        src={corridor}
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
      <Image
        src={classic1}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`
          absolute
          w-full
          object-cover
        `}
      />
      <Image
        src={classic2}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`
          absolute
          w-full
          object-cover
        `}
      />
      <Image
        src={classic3}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`
          absolute
          w-full
          object-cover
        `}
      />
      <Image
        src={classic4}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`
          absolute
          w-full
          object-cover
        `}
      />
      <button onClick={() => setElev(prev => !prev)} className={`
        relative right-[17%] top-[-20px]
        h-[14vw]
        w-[4vw]
      `}></button>
    </div>
  );
}

export default Perspective1;