import Image from "next/image";

interface PerspectiveProp {
  width: string
  opacity: string
}
function Perspective1({ opacity, width }: PerspectiveProp) {
  return (
    <div className={`
      absolute
      flex items-center justify-center
      h-full 
    `} style={{
      opacity: `${opacity}`,
      width: `${width}vw`,
      transition: "0.8s ease"
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