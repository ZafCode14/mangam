import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicFront({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const image0 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[5]?.image;
  const image6 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[6]?.image;
  const image7 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[7]?.image;

  const commonStyle = `
    absolute
    flex items-end
    bg-[#004d8071]
  `;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[16vw] left-[6vw] w-[4vw] h-[10vw]`}
      >
        {image0 && (
          <Image
            src={image0}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div
        className={`${commonStyle} bottom-[16vw] left-[11vw] w-[4vw] h-[10vw]`}
      >
        {image1 && (
          <Image
            src={image1}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div
        className={`${commonStyle} bottom-[16vw] left-[17vw] w-[4vw] h-[10vw]`}
      >
        {image2 && (
          <Image
            src={image2}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div
        className={`${commonStyle} bottom-[16vw] left-[23vw] w-[4vw] h-[10vw]`}
      >
        {image3 && (
          <Image
            src={image3}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div
        className={`${commonStyle} bottom-[16vw] right-[4vw] w-[4vw] h-[10vw]`}
      >
        {image4 && (
          <Image
            src={image4}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div
        className={`${commonStyle} bottom-[16vw] right-[10vw] w-[4vw] h-[10vw]`}
      >
        {image5 && (
          <Image
            src={image5}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 7 */}
      <div
        className={`${commonStyle} bottom-[16vw] right-[17vw] w-[4vw] h-[10vw]`}
      >
        {image6 && (
          <Image
            src={image6}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 8 */}
      <div
        className={`${commonStyle} bottom-[16vw] right-[23vw] w-[4vw] h-[10vw]`}
      >
        {image7 && (
          <Image
            src={image7}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>
    </div>
  );
}

export default ClassicFront;