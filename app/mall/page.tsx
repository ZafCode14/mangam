import Image from "next/image";

function page() {
  return (
    <main className="relative w-full top-[70px]" style={{
      height: "calc(100vh - 70px)"
    }}>
      <div className={`
        relative
        flex items-center justify-center
        h-full w-auto
      `}>
        <Image
          src={"/images/mall/Floor.jpeg"}
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
          src={"/images/mall/classic3.png"}
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
          src={"/images/mall/classic1.png"}
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
          src={"/images/mall/classic2.png"}
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
          src={"/images/mall/classic4.png"}
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
    </main>
  );
}

export default page;