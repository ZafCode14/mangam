"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import useRedirect from "@/hooks/redirect";
import Whishlist from "@/components/account/whishlist";
import Appointments from "@/components/account/appointments";
import { useState } from "react";
import Orders from "@/components/account/orders";
import Delivery from "@/components/account/delivery";
import PersonalInformation from "@/components/account/personalInformation";

function Page() {
  const [accountTab, setAccountTab] = useState<number>(1);
  const { loading, isAuthenticated } = useRedirect();// Call the useAuth hook
  
  const router = useRouter();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Show loading state if checking auth
  if (loading) {
    return <Loading/>; // Or any loading spinner
  }
  // eslint-disable-next-line react/jsx-key
  const tabs = [<Whishlist/>, <Appointments/>, <Orders/>, <Delivery/>, <PersonalInformation/>]

  if (isAuthenticated) {
    return (
      <main className="w-full h-screen flex flex-col pt-[80px] px-20">
        <div className="h-[15%] flex items-center justify-end">
          <p className="bg-[#C1A875] text-white px-10 py-2 rounded-md" onClick={handleLogout}>Log Out</p>
        </div>
        <div className="flex h-[85%]">
          <div className="w-[30%] flex flex-col items-center text-center font-bold text-[16px]">
            <h3 className="text-[24px]">Account</h3>
            <p onClick={() => setAccountTab(1)} className={`cursor-pointer my-2 ${accountTab === 1 && "underline"}`}>Wishlist</p>
            <p onClick={() => setAccountTab(2)} className={`cursor-pointer my-2 ${accountTab === 2 && "underline"}`}>Appointments</p>
            <p onClick={() => setAccountTab(3)} className={`cursor-pointer my-2 ${accountTab === 3 && "underline"}`}>Orders</p>
            <p onClick={() => setAccountTab(4)} className={`cursor-pointer my-2 ${accountTab === 4 && "underline"}`}>Delivery Address</p>
            <p onClick={() => setAccountTab(5)} className={`cursor-pointer my-2 ${accountTab === 5 && "underline"}`}>Personal Information & Password</p>
          </div>
          <div className="w-0 mt-5 h-[210px] border-r border-[#c4c4c4]"></div>

          <div className="w-[70%] h-full overflow-y-scroll px-5">
            {tabs[accountTab - 1]}
          </div>
        </div>
      </main>
    );
  } else return null;
}

export default Page;