import Image from "next/image";
function page() {
  return (
    <main className={`flex justify-center w-full h-screen text-white`}>
      <div className={`
        relative top-[70px]
        flex items-start justify-center
        max-w-full w-[1200px] pt-[50px]
      `} style={{
        height: "calc(100% - 70px)"
      }}>
        <div className={`w-[30%] bg-[#2A1C1B] h-[94%] rounded-md`}>
        </div>
        <div className={`h-full w-full flex justify-between ml-5`}>
          <div className={`
          bg-[#E8E4E1] 
          flex items-center
          h-[77px] w-[70%] rounded-md mr-5
          `}>
            <Image
              src={'/icons/search.svg'}
              alt={'search icon'}
              width={100}
              height={100}
              priority
              className={`h-[30px] w-auto ml-5`}
            />
            <input placeholder="Search products" className={`ml-5 w-[70%] bg-[#E8E4E1] focus:outline-none text-black`}/>
            <div className={``}></div>
          </div>
          <button className={`
            bg-[#2A1C1B]
            w-[30%] h-[77px]
            rounded-md
          `}>Search by Product</button>
        </div>
      </div>
    </main>
  );
}

export default page;