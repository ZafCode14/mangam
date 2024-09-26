"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/loading";
import useRedirect from "@/hooks/redirect";
import Whishlist from "@/components/account/whishlist";
import Appointments from "@/components/account/appointments";
import Orders from "@/components/account/orders";
import Delivery from "@/components/account/delivery";
import PersonalInformation from "@/components/account/personalInformation";

function AccountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabMap: { [key: string]: JSX.Element } = {
    wishlist: <Whishlist />,
    appointments: <Appointments />,
    orders: <Orders />,
    delivery: <Delivery />,
    "personal-information": <PersonalInformation />,
  };

  // Get the current tab from the search parameters, defaulting to 'wishlist'
  const activeTab = searchParams.get("tab") || "wishlist";

  return (
    <div className="flex h-[85%]">
      <div className="w-[30%] flex flex-col items-center text-center font-bold text-[16px]">
        <h3 className="text-[24px]">Account</h3>
        <p
          onClick={() => router.push("/account?tab=wishlist")}
          className={`cursor-pointer my-2 ${activeTab === "wishlist" && "underline"}`}
        >
          Wishlist
        </p>
        <p
          onClick={() => router.push("/account?tab=appointments")}
          className={`cursor-pointer my-2 ${activeTab === "appointments" && "underline"}`}
        >
          Appointments
        </p>
        <p
          onClick={() => router.push("/account?tab=orders")}
          className={`cursor-pointer my-2 ${activeTab === "orders" && "underline"}`}
        >
          Orders
        </p>
        <p
          onClick={() => router.push("/account?tab=delivery")}
          className={`cursor-pointer my-2 ${activeTab === "delivery" && "underline"}`}
        >
          Delivery Address
        </p>
        <p
          onClick={() => router.push("/account?tab=personal-information")}
          className={`cursor-pointer my-2 ${activeTab === "personal-information" && "underline"}`}
        >
          Personal Information & Password
        </p>
      </div>
      <div className="w-0 mt-5 h-[210px] border-r border-[#c4c4c4]"></div>

      <div className="w-[70%] h-full overflow-y-auto px-5">
        {/* Render the tab based on the URL parameter */}
        {tabMap[activeTab] || <Whishlist />}
      </div>
    </div>
  );
}

function Page() {
  const { loading, isAuthenticated } = useRedirect(); // Call the useAuth hook
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Show loading state if checking auth
  if (loading) {
    return <Loading />; // Or any loading spinner
  }

  if (isAuthenticated) {
    return (
      <main className="w-full h-screen flex flex-col pt-[80px] px-20">
        <div className="h-[15%] flex items-center justify-end">
          <p className="bg-[#C1A875] text-white px-10 py-2 rounded-md" onClick={handleLogout}>
            Log Out
          </p>
        </div>

        {/* Wrap dynamic search params logic inside Suspense */}
        <Suspense fallback={<Loading />}>
          <AccountPageContent />
        </Suspense>
      </main>
    );
  } else return null;
}

export default Page;