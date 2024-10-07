import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicLeft({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex flex-col justify-end
  `;
  const image0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[5]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[20vw] w-[8vw] h-[12vw]`}
      >
        {image0 && (
          <Image
            src={image0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[29vw] w-[8vw] h-[12vw]`}
      >
        {image1 && (
          <Image
            src={image1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[40vw] w-[8vw] h-[12vw]`}
      >
        {image2 && (
          <Image
            src={image2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[49vw] w-[8vw] h-[12vw]`}
      >
        {image3 && (
          <Image
            src={image3}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[60vw] w-[8vw] h-[12vw]`}
      >
        {image4 && (
          <Image
            src={image4}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div
        className={`${commonStyle} bottom-[19vw] left-[69vw] w-[8vw] h-[12vw]`}
      >
        {image5 && (
          <Image
            src={image5}
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

export default ClassicLeft;