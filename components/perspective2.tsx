import Image from "next/image";

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
}
function Perspective2({ setElev }: PerspectiveProp) {
  return (
    <div className={`
      absolute
      flex items-center justify-center
      h-full w-[100%]
    `}>
      <Image
        src={"/images/mall/perspective2/Corridor.jpeg"}
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
        src={"/images/mall/perspective2/Modern1.png"}
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
        src={"/images/mall/perspective2/Modern2.png"}
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