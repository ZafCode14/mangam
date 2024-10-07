import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicEnd({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image;

  const image5 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[4]?.image;
  const image6 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[5]?.image;
  const image7 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[6]?.image;
  const image8 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[7]?.image;
  const image9 = vendor.vendor.spots[`${shopStyle}center.jpg`]?.[8]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[18.5vw] left-[1vw] w-[7vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] left-[9vw] w-[7vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] left-[17vw] w-[7vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] left-[25vw] w-[7vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] left-[33vw] w-[7vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] left-[60vw] w-[7vw] h-[12vw]`}
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

      {/** Position 7 */}
      <div
        className={`${commonStyle} bottom-[18.5vw] left-[68vw] w-[7vw] h-[12vw]`}
      >
        {image6 && (
          <Image
            src={image6}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 8 */}
      <div
        className={`${commonStyle} bottom-[18.5vw] left-[76vw] w-[7vw] h-[12vw]`}
      >
        {image7 && (
          <Image
            src={image7}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 9 */}
      <div
        className={`${commonStyle} bottom-[18.5vw] left-[84vw] w-[7vw] h-[12vw]`}
      >
        {image8 && (
          <Image
            src={image8}
            alt="item"
            width={200}
            height={200}
            className="object-contain h-full"
          />
        )}
      </div>

      {/** Position 10 */}
      <div
        className={`${commonStyle} bottom-[18.5vw] left-[92vw] w-[7vw] h-[12vw]`}
      >
        {image9 && (
          <Image
            src={image9}
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

export default ClassicEnd;