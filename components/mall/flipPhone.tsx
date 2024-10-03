import Image from "next/image";

function FlipPhone() {
  return (
    <div className={`
      bg-[white] 
      fixed z-20 top-0 right-0
      w-full h-screen 
      flex items-center justify-center 
    `}>
      <Image
        alt="flip phone"
        src={"/images/flipPhone/arrowLeft.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/arrowRight.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/g.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/line.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/mobile.png"}
        width={400}
        height={400}
        className={`absolute`}
        priority
      />
      <Image
        alt="flip phone"
        src={"/images/flipPhone/rotate.png"}
        width={400}
        height={400}
        className={`absolute`}
      />
    </div>
  );
}

export default FlipPhone;