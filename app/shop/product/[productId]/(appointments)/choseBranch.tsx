import { useState } from "react";
import ChoseDateTime from "./choseDateTime";

interface Branch {
  inStock: string;
  address: string;
  phoneNumbers: string[];
  branch: string;
}
interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  branches: Branch[]
}

interface Vendor {
  docID: string;
  name: string;
  branches: Branch[];
}
interface Props {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  vendor: Vendor;
  product: Product;
}
function ChoseBranch({ setAppointment, userId, vendor, product }:Props) {
  const [next, setNext] = useState(false);

  return (
    <div className="w-[600px] h-[500px] bg-white rounded-md flex flex-col relative">
      {/* Header Section */}
      <div className="flex border-b border-[#bebebe] relative justify-center">
        <p onClick={() => setAppointment(false)} className="absolute left-5 top-4 text-[20px]">
          &lt;
        </p>
        <p className="py-5">Please choose a branch</p>
      </div>

      {/* Brand Choises */}
      <div className="flex-1 px-10 w-full">
        {
          product.branches.map((branch, index) => {
            return (
              <div key={index} className={`bg-gray-300 p-5 w-[49%]`}>
                <p>{branch.branch}</p>
                <p>{branch.address}</p>
                <p>{branch.inStock}</p>
                <p>{branch.phoneNumbers}</p>
              </div>
            )
          })
        }
      </div>

      {/* Confirm Button */}
      <button 
        className={`rounded-md w-[200px] py-3 text-white mx-auto mb-10 bg-gray-200`}
        onClick={() => setNext(true)}
      >
        Chose Time Slot
      </button>
      {
        next &&
        <div className={`
          absolute
          right-0 top-0
          h-full w-full
          bg-[white]
        `}>
          <ChoseDateTime
            setAppointment={setAppointment}
            setNext={setNext}
            vendor={vendor}
            product={product}
            userId={userId}
          />
        </div>
      }
    </div>
  );
}

export default ChoseBranch;