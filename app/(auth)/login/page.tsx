import Image from "next/image";

function page() {
  const inputClass = "w-[340px] h-[50px] rounded-md my-2 placeholder:text-center"; // Added `text-black` to make text inside the inputs visible
  const selectClass = "w-[340px] h-[50px] rounded-md my-2 text-center bg-white text-gray-400"; // Styling for the select dropdown
  
  return (
    <main className="flex h-screen text-white relative">
      <div className="w-[71%] h-full overflow-hidden flex items-end relative">
        <Image
          alt='login image'
          src='/images/loginImage.png'
          height={3000}
          width={3000}
          className="w-full h-auto relative"
        />
        <p className="absolute text-[45px] top-12 left-12 leading-[45px]">
          Experience <br /> <i>Something New</i>
        </p>
        <p className="absolute text-[45px] bottom-12 right-5 leading-[45px]">
          All Your <br /> Favorite Brands <br /> <i>In One Place</i>
        </p>
      </div>
      <div className="bg-[#2A1C1B] w-[30%] flex flex-col justify-center items-center">
        <p>Sign Up</p>
        <form className="flex flex-col">
          <input placeholder="First Name" className={inputClass} />
          <input placeholder="Last Name" className={inputClass} />
          <input placeholder="E-mail" className={inputClass} />
          <input placeholder="Phone Number" className={inputClass} />
          
          {/* Gender select dropdown */}
          <select className={selectClass} defaultValue="">
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          
          <input placeholder="Password" className={inputClass} type="password" />
          <input placeholder="Confirm Password" className={inputClass} type="password" />
          <button className={`bg-[#9EA1A1] ${inputClass}`}>Create Account</button>
        </form>
        <p>Already have an account? <span className="text-[#BF9944]">Sign In</span></p>
      </div>
    </main>
  );
}

export default page;