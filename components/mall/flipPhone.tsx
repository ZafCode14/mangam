import Image from "next/image";

function FlipPhone() {
  return (
    <div className="bg-[white] absolute w-full h-screen flex items-center justify-center z-20">
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