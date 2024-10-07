import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicMiddle({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
  `;

  const rimage0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const rimage1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.image;

  const limage0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;
  const limage1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[21vw] right-[7vw] w-[5vw] h-[8vw]`}
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
        className={`${commonStyle} bottom-[20.5vw] right-[1vw] w-[5vw] h-[8.5vw]`}
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

      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[21vw] left-[6vw] w-[5vw] h-[8vw]`}
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
        className={`${commonStyle} bottom-[20.5vw] left-[0.5vw] w-[5vw] h-[8.5vw]`}
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

    </div>
  );
}

export default ClassicMiddle;