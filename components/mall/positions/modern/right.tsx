import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernRight({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
    bg-[#004d8071]
   
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[4]?.image;

  const bimage12 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[12]?.image;
  const bimage13 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[13]?.image;
  const bimage14 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[14]?.image;
  const bimage15 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[15]?.image;
  const bimage16 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[16]?.image;
  const bimage17 = vendor.vendor.spots[`${shopStyle}right.jpg`]?.[17]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Back Right Set */}
      {/** Position 13 */}
      <div className={`${commonStyle} bottom-[25vw] left-[0vw] w-[7vw] h-[10vw]`}>
        {bimage12 && (
          <Image
            src={bimage12}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 14 */}
      <div className={`${commonStyle} bottom-[25vw] left-[8vw] w-[7vw] h-[10vw]`}>
        {bimage13 && (
          <Image
            src={bimage13}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 15 */}
      <div className={`${commonStyle} bottom-[25vw] left-[16vw] w-[7vw] h-[10vw]`}>
        {bimage14 && (
          <Image
            src={bimage14}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 16 */}
      <div className={`${commonStyle} bottom-[13vw] left-[0vw] w-[7vw] h-[10vw]`}>
        {bimage15 && (
          <Image
            src={bimage15}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 17 */}
      <div className={`${commonStyle} bottom-[14vw] left-[8vw] w-[7vw] h-[10vw]`}>
        {bimage16 && (
          <Image
            src={bimage16}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>

      {/** Position 18 */}
      <div className={`${commonStyle} bottom-[15vw] left-[16vw] w-[7vw] h-[10vw]`}>
        {bimage17 && (
          <Image
            src={bimage17}
            alt="item"
            width={200}
            height={200}
            className="object-cover w-full"
          />
        )}
      </div>


      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[12vw] left-[18vw] w-[10vw] h-[12vw]`}
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
        className={`${commonStyle} bottom-[14vw] left-[28.5vw] w-[8vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[15.3vw] left-[37vw] w-[6vw] h-[9vw]`}
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
        className={`${commonStyle} bottom-[16.5vw] right-[33vw] w-[10vw] h-[15vw]`}
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
        className={`${commonStyle} bottom-[15.5vw] right-[22.7vw] w-[10vw] h-[15vw]`}
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

export default ModernRight;