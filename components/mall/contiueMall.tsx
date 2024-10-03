import Image from "next/image";

function ContiueMall() {
  return (
    <div className="w-full h-full">
      <Image
        src={'/images/mall/perspective1/corridor.jpeg'}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />
      {/** Left Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={'/images/mall/perspective1/modern1.png'}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
        <div className={`
          absolute top-[12vw] right-[10vw] z-20
          flex justify-center
          w-[20vw] h-[5vw]
        `} style={{
          transform: "skewY(-25deg)"
        }}>
          <Image
            src={"/icons/logo.png"}
            alt="floor plan"
            width={3000}
            height={3000}
            className={`w-full h-full object-contain`}
          />
        </div>
      </div>

      {/** Right Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={'/images/mall/perspective1/classic2.png'}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Right Far  */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={'/images/mall/perspective1/modern3.png'}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Left Far */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={'/images/mall/perspective1/modern4.png'}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      </div>
  );
}

export default ContiueMall;