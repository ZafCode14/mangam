import Image from "next/image";

interface PerspectiveProp {
  className: string
}
function Perspective1({ className }: PerspectiveProp) {
  return (
    <div className={`
      absolute
      flex items-center justify-center
      h-full 
      ${className}
    `} style={{
      transition: "1s ease"
    }}>
      <Image
        src={"/images/mall/perspective1/Floor.jpeg"}
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
        src={"/images/mall/perspective1/classic3.png"}
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
        src={"/images/mall/perspective1/classic1.png"}
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
        src={"/images/mall/perspective1/classic2.png"}
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
        src={"/images/mall/perspective1/classic4.png"}
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

export default Perspective1;