"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Adjust to your Firebase configuration
import useAuth from "@/hooks/redirect";
import Loading from "@/components/loading";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { loading  } = useAuth();

  const inputClass = "w-[340px] max-w-full h-[40px] rounded-md my-2 text-black placeholder:text-center";

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      // Firebase sign-in
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to the homepage after login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Custom error handling based on Firebase error codes
      if (err.code === "auth/user-not-found") {
        setError("Incorrect Email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect Password");
      } else {
        setError("Failed to log in. Please try again.");
      }
    }
  };

  if (loading) {
    return <Loading/>
  }

  return (
    <main className="flex h-screen text-white relative z-20">
      <div className="w-[71%] h-full overflow-hidden flex items-end relative">
        <Image
          alt="login image"
          src="/images/loginImage.png"
          height={3000}
          width={3000}
          className="w-full h-auto relative"
          priority
        />
        <p className="absolute text-[45px] top-12 left-12 leading-[45px]">
          Experience <br /> <i>Something New</i>
        </p>
        <p className="absolute text-[45px] bottom-12 right-5 leading-[45px]">
          All Your <br /> Favorite Brands <br /> <i>In One Place</i>
        </p>
      </div>

      <div className="bg-[#2A1C1B] w-[30%] flex flex-col justify-center items-center">
        <p>Sign In</p>
        <form className="flex flex-col w-[90%]" onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle input change
            required
          />
          <input
            placeholder="Password"
            className={inputClass}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Handle input change
            required
          />
          {error && <p className="text-red-500">{error}</p>} {/* Display error if present */}
          <button className={`text-white bg-[#BF9944] ${inputClass}`} type="submit">
            Sign In
          </button>
        </form>
        <Link href="/register">
          <p>
            Don&apso;t have an account? <span className="text-[#BF9944]">Sign Up</span>
          </p>
        </Link>
      </div>
    </main>
  );
}

export default Page;