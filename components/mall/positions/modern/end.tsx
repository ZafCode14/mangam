import Image from "next/image";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendor: any;
}

function ModernEnd({ vendor }: Props) {
  const shopStyle = vendor.vendor.chosenShopStyle;

  const commonStyle = `
    absolute
    flex items-end
  `;

  const images = [];
  for (let i = 0; i < 18; i++) {
    images.push(vendor.vendor.spots[`${shopStyle}center.jpg`]?.[i]?.image);
  }

  return (
    <div className="h-full w-full absolute top-0 right-0">
      {/** Left Set */}
      {/** Position 1 */}
      <div className={`${commonStyle} bottom-[22vw] left-[4vw] w-[6vw] h-[9vw]`}>
        {images[0] && (
          <Image
            src={images[0]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 2 */}
      <div className={`${commonStyle} bottom-[22vw] left-[11.5vw] w-[6vw] h-[9vw]`}>
        {images[1] && (
          <Image
            src={images[1]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 3 */}
      <div className={`${commonStyle} bottom-[22vw] left-[19vw] w-[6vw] h-[9vw]`}>
        {images[2] && (
          <Image
            src={images[2]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 4 */}
      <div className={`${commonStyle} bottom-[12vw] left-[4vw] w-[6vw] h-[9vw]`}>
        {images[3] && (
          <Image
            src={images[3]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 5 */}
      <div className={`${commonStyle} bottom-[12vw] left-[11.5vw] w-[6vw] h-[9vw]`}>
        {images[4] && (
          <Image
            src={images[4]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 6 */}
      <div className={`${commonStyle} bottom-[12vw] left-[19vw] w-[6vw] h-[9vw]`}>
        {images[5] && (
          <Image
            src={images[5]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Middle Set */}
      {/** Position 7 */}
      <div className={`${commonStyle} bottom-[22vw] left-[41vw] w-[6vw] h-[9vw]`}>
        {images[6] && (
          <Image
            src={images[6]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 8 */}
      <div className={`${commonStyle} bottom-[22vw] left-[48vw] w-[6vw] h-[9vw]`}>
        {images[7] && (
          <Image
            src={images[7]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 9 */}
      <div className={`${commonStyle} bottom-[22vw] left-[55vw] w-[6vw] h-[9vw]`}>
        {images[8] && (
          <Image
            src={images[8]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 10 */}
      <div className={`${commonStyle} bottom-[12vw] left-[41vw] w-[6vw] h-[9vw]`}>
        {images[9] && (
          <Image
            src={images[9]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 11 */}
      <div className={`${commonStyle} bottom-[12vw] left-[48vw] w-[6vw] h-[9vw]`}>
        {images[10] && (
          <Image
            src={images[10]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 12 */}
      <div className={`${commonStyle} bottom-[12vw] left-[55vw] w-[6vw] h-[9vw]`}>
        {images[11] && (
          <Image
            src={images[11]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Right Set */}
      {/** Position 13 */}
      <div className={`${commonStyle} bottom-[22vw] left-[73vw] w-[6vw] h-[9vw]`}>
        {images[12] && (
          <Image
            src={images[12]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 14 */}
      <div className={`${commonStyle} bottom-[22vw] left-[80.5vw] w-[6vw] h-[9vw]`}>
        {images[13] && (
          <Image
            src={images[13]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 15 */}
      <div className={`${commonStyle} bottom-[22vw] left-[88vw] w-[6vw] h-[9vw]`}>
        {images[14] && (
          <Image
            src={images[14]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 16 */}
      <div className={`${commonStyle} bottom-[12vw] left-[73vw] w-[6vw] h-[9vw]`}>
        {images[15] && (
          <Image
            src={images[15]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 17 */}
      <div className={`${commonStyle} bottom-[12vw] left-[80.5vw] w-[6vw] h-[9vw]`}>
        {images[16] && (
          <Image
            src={images[16]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

      {/** Position 18 */}
      <div className={`${commonStyle} bottom-[12vw] left-[88vw] w-[6vw] h-[9vw]`}>
        {images[17] && (
          <Image
            src={images[17]}
            alt="item"
            width={200}
            height={200}
            className="object-contain w-full"
          />
        )}
      </div>

    </div>
  );
}

export default ModernEnd;