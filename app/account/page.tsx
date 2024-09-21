"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/redirect";
import Loading from "@/components/loading";

function Page() {
  const { loading, isAuthenticated } = useAuth(); // Call the useAuth hook
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

  if (isAuthenticated) {
    return (
      <div
        className="w-full h-screen flex justify-center items-center cursor-pointer"
        onClick={handleLogout}
      >
        Log out
      </div>
    );
  } else return null;
}

export default Page;