import Image from "next/image";

interface Props {
  floor: string;
}
function ContiueMall({ floor }: Props) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={`/images/mall/perspective1/${floor}/corridor.jpeg`}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />
      {/** Left Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/perspective1/${floor}/modern1.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>

      {/** Right Close */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/perspective1/${floor}/classic2.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Right Far  */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/perspective1/${floor}/modern3.png`}
          alt="floor plan"
          width={3000}
          height={3000}
          className={`w-full h-full`}
        />
      </div>
      {/** Left Far */}
      <div className={`absolute w-full object-cover`}>
        <Image
          src={`/images/mall/perspective1/${floor}/modern4.png`}
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