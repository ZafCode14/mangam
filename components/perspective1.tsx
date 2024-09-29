import Image from "next/image";

interface PerspectiveProp {
  setElev: React.Dispatch<React.SetStateAction<boolean>>;
  floor: string;
  middleButton: boolean;
}

function Perspective1({ middleButton, setElev, floor }: PerspectiveProp) {
  let corridor = "";
  let classic1 = "";
  let classic2 = "";
  let classic3 = "";
  let classic4 = "";
  let raw = "";

  if (floor === "gold") {
    corridor = "/images/mall/perspective1/Corridor.jpeg";
    classic1 = "/images/mall/perspective1/Classic1.png";
    classic2 = "/images/mall/perspective1/Modern2.png";
    classic3 = "/images/mall/perspective1/Classic3.png";
    classic4 = "/images/mall/perspective1/Modern4.png";
  } else if (floor === "silver") {
    corridor = "/images/mall/Sperspective1/Corridor.jpeg";
    classic1 = "/images/mall/Sperspective1/Modern1.png";
    classic2 = "/images/mall/Sperspective1/Classic2.png";
    classic3 = "/images/mall/Sperspective1/Classic3.png";
    classic4 = "/images/mall/Sperspective1/Modern4.png";
  } else if (floor === "raw") {
    raw = "/images/mall/Rperspective1/C-I.jpeg";
  }

  if (floor === "raw") {
    return (
      <div
        className={`absolute z-10 h-full`}
        style={{
          opacity: middleButton ? "1" : "0",
          width: middleButton ? "100vw" : "120vw",
          transition: "1s ease",
          pointerEvents: middleButton ? "auto" : "none", // Disable interaction when middleButton is false
        }}
      >
        <Image
          src={raw}
          alt="floor plan"
          width={3000}
          height={3000}
          priority
          className={`absolute w-full object-cover`}
        />
        <button
          onClick={() => setElev((prev) => !prev)}
          className={`relative right-[-33vw] top-[10vw] h-[25vw] w-[8vw]`}
        ></button>
      </div>
    );
  }

  return (
    <div
      className={`absolute z-10 h-full flex justify-center items-center`}
      style={{
        opacity: middleButton ? "0" : "1",
        width: middleButton ? "150vw" : "100vw",
        transition: "1s ease",
        pointerEvents: middleButton ? "none" : "auto", // Disable interaction when opacity is 0
      }}
    >
      <Image
        src={corridor}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />
      <Image
        src={classic1}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`absolute w-full object-cover`}
      />
      <Image
        src={classic2}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`absolute w-full object-cover`}
      />
      <Image
        src={classic3}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`absolute w-full object-cover`}
      />
      <Image
        src={classic4}
        alt="floor plan"
        width={3000}
        height={3000}
        className={`absolute w-full object-cover`}
      />
      <button
        onClick={() => setElev((prev) => !prev)}
        className={`relative right-[17%] top-[-20px] h-[14vw] w-[4vw]`}
      ></button>
    </div>
  );
}

export default Perspective1;