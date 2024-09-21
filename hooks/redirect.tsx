import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Stop loading after checking auth state
      setIsAuthenticated(!!user); // Set auth status: true if user exists, false otherwise

      if (!user) {
        router.push("/login");
      } else {
        if (pathname === "/login" || pathname === "/register") {
          router.push("/")
        }
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [router, pathname]);

  return { loading, isAuthenticated }; // Return loading and authentication status
};

export default useAuth;