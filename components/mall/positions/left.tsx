import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function Left({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex flex-col justify-end
    bg-[#004d8071]
  `;
  const image0 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}left.jpg`]?.[4]?.image;

  const bimage0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.image;
  const bimage1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.image;
  const bimage2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.image;
  const bimage3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.image;
  const bimage4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image;
  const bimage5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.image;
  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** End left Set */}
      {/** Position 1 */}
      <div className={`${commonStyle} bottom-[30vw] left-[60vw] w-[6vw] h-[8vw]`}>
        {bimage0 && (
          <Image
            src={bimage0}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div className={`${commonStyle} bottom-[30vw] left-[67vw] w-[6vw] h-[8vw]`}>
        {bimage1 && (
          <Image
            src={bimage1}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div className={`${commonStyle} bottom-[30vw] left-[74vw] w-[6vw] h-[8vw]`}>
        {bimage2 && (
          <Image
            src={bimage2}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div className={`${commonStyle} bottom-[22vw] left-[60vw] w-[6vw] h-[8vw]`}>
        {bimage3 && (
          <Image
            src={bimage3}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div className={`${commonStyle} bottom-[21.5vw] left-[67vw] w-[6vw] h-[8vw]`}>
        {bimage4 && (
          <Image
            src={bimage4}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div className={`${commonStyle} bottom-[21vw] left-[74vw] w-[6vw] h-[8.5vw]`}>
        {bimage5 && (
          <Image
            src={bimage5}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>


      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[20vw] left-[58vw] w-[8vw] h-[9vw]`}
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
        className={`${commonStyle} bottom-[20.5vw] left-[51.5vw] w-[7vw] h-[9vw]`}
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
        className={`${commonStyle} bottom-[21.5vw] left-[45.5vw] w-[6vw] h-[8vw]`}
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
        className={`${commonStyle} bottom-[22vw] left-[23.5vw] w-[10vw] h-[18vw]`}
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
        className={`${commonStyle} bottom-[20.5vw] left-[12vw] w-[10vw] h-[20vw]`}
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
    </div>
  );
}

export default Left;