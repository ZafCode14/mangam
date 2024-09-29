import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import ChoseBranch from "./choseBranch";

interface Branch {
  inStock: string;
  address: string;
  phoneNumber: string[];
  location: string;
}
interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  newBranches: Branch[];
}
interface Vendor {
  docID: string;
  name: string;
  branches: Branch[];
}

interface Prop {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  vendor: Vendor;
  product: Product;
}


function CreateAppointment({ setAppointment, vendor, product }: Prop) {
  const [userId, setUserId] = useState<string | null>(null);
  const auth = getAuth();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);


  if (userId) {
    return (
      <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center top-0 right-0 bg-[#000000a1] z-10">
        <ChoseBranch 
          setAppointment={setAppointment}
          userId={userId}
          vendor={vendor}
          product={product}
        />
      </div>
    );
  }
}

export default CreateAppointment;