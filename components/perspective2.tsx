import Image from "next/image";

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
}
function Perspective2({ setElev, floor }: PerspectiveProp) {
  let corridor = "";
  let classic1 = "";
  let classic2 = "";
  let raw = "";
  if (floor === "gold") {
    corridor = "/images/mall/perspective2/Corridor.jpeg"; 
    classic1 = "/images/mall/perspective2/Classic1.png"
    classic2 = "/images/mall/perspective2/Modern2.png"
  } else if (floor === "silver") {
    corridor = "/images/mall/Sperspective2/Corridor.jpeg"; 
    classic1 = "/images/mall/Sperspective2/Classic1.png"
    classic2 = "/images/mall/Sperspective2/Modern2.png"
  } else if (floor === "raw") {
    raw = "/images/mall/Rperspective2/C.jpeg"
  }

  if (floor === "raw") {
  return (
    <div className={`
      absolute
      flex items-center justify-center
      h-full w-[100%]
    `}>
      <Image
        src={raw}
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
      <button onClick={() => setElev(prev => !prev)} className={`
        relative right-[38%] top-[-35px]
        h-[27vw]
        w-[15vw]
      `}></button>
    </div>
  );
}
  return (
    <div className={`
      absolute
      flex items-center justify-center
      h-full w-[100%]
    `}>
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
      <button onClick={() => setElev(prev => !prev)} className={`
        relative right-[38%] top-[-35px]
        h-[27vw]
        w-[15vw]
      `}></button>
    </div>
  );
}

export default Perspective2;