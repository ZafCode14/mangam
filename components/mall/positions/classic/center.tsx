import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ClassicCenter({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
   
  `;

  const image0 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[0]?.image;
  const image1 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[1]?.image;
  const image2 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[2]?.image;
  const image3 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[3]?.image;
  const image4 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[4]?.image;
  const image5 = vendor.vendor.spots[`${shopStyle}3.jpg`]?.[5]?.image;

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Position 1 */}
      <div
        className={`${commonStyle} bottom-[15vw] left-[35vw] w-[7vw] h-[11vw]`}
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
        className={`${commonStyle} bottom-[27vw] left-[37.5vw] w-[6vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[15vw] left-[46vw] w-[7vw] h-[11vw]`}
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
        className={`${commonStyle} bottom-[27vw] left-[46.5vw] w-[6vw] h-[10vw]`}
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
        className={`${commonStyle} bottom-[15vw] left-[57vw] w-[7vw] h-[11vw]`}
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
        className={`${commonStyle} bottom-[27vw] left-[55vw] w-[6vw] h-[10vw]`}
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

export default ClassicCenter;