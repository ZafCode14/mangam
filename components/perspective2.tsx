import Image from "next/image";

function Perspective2() {
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
        src={"/images/mall/perspective2/Classic1.png"}
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
        src={"/images/mall/perspective2/Classic2.png"}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`
          absolute
          w-full
          object-cover
        `}
      />
    </div>
  );
}

export default Perspective2;