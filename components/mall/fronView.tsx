import Image from "next/image";

interface Prop {
  frontImage: string;
}
function FronView({ frontImage }: Prop) {
  return (
    <div
      className={`absolute z-10 h-full flex justify-center items-center`}
    >
      <Image
        src={frontImage}
        alt="floor plan"
        width={3000}
        height={3000}
        priority
        className={`absolute w-full object-cover`}
      />
    </div>
  );
}

export default FronView;