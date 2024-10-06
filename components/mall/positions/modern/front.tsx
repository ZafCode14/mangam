import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernFront({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const image0 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}front.jpg`]?.[5]?.image;

  const commonStyle = `
    absolute
    flex items-end
    bg-[#004d8071]
  `;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[18vw] right-[56.3vw] w-[4vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[21.5vw] right-[49.5vw] w-[4vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[20vw] right-[43vw] w-[4vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] right-[36.5vw] w-[4vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[23.5vw] right-[30.2vw] w-[4vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[18.5vw] right-[24vw] w-[4vw] h-[10vw]`}
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
    </div>
  );
}

export default ModernFront;