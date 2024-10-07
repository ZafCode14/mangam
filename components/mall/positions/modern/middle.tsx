import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernMiddle({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
  `;

  const rimage0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const rimage1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.image;
  const rimage2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.image;

  const limage0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;
  const limage1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const limage2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[19vw] right-[25vw] w-[5vw] h-[6vw]`}
      >
        {rimage0 && (
          <Image
            src={rimage0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[19vw] right-[19.5vw] w-[5vw] h-[6vw]`}
      >
        {rimage1 && (
          <Image
            src={rimage1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[19vw] right-[14vw] w-[5vw] h-[6vw]`}
      >
        {rimage2 && (
          <Image
            src={rimage2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>
      

      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[17vw] w-[5vw] h-[6vw]`}
      >
        {limage0 && (
          <Image
            src={limage0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[11.5vw] w-[5vw] h-[6vw]`}
      >
        {limage1 && (
          <Image
            src={limage1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[6vw] w-[5vw] h-[6vw]`}
      >
        {rimage2 && (
          <Image
            src={limage2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

    </div>
  );
}

export default ModernMiddle;