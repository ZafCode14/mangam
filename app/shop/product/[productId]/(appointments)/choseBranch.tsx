import { useState } from "react";
import ChoseDateTime from "./choseDateTime";

interface Branch {
  inStock: string;
  address: string;
  phoneNumbers: string[];
}
interface Product {
  docID: string;
  brandDocID: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  branches: {[key: string]: Branch};
}

interface Vendor {
  docID: string;
  name: string;
}
interface Props {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  vendor: Vendor;
  product: Product;
}
function ChoseBranch({ setAppointment, userId, vendor, product }: Props) {
  const [next, setNext] = useState(false);
  const [choseBranchInfo, setChosenBranchInfo] = useState<Branch | null>(null);

  return (
    <div className="w-[600px] max-w-full h-[500px] bg-white rounded-md flex flex-col relative">
      {/* Header Section */}
      <div className="flex border-b border-[#bebebe] relative justify-center">
        <p
          onClick={() => setAppointment(false)}
          className="absolute left-5 top-4 text-[20px]"
        >
          &lt;
        </p>
        <p className="py-5">Please choose a branch</p>
      </div>

      {/* Branch Choices */}
      <div className="flex-1 px-5 w-full mt-10 flex justify-between items-start text-[12px] md:text-[16px]">
        {Object.entries(product.branches).map(([location, branch], index) => {
          const isSelected = choseBranchInfo === branch;
          return (
            <div
              onClick={() => setChosenBranchInfo(branch)}
              key={index}
              className={`
                p-5 w-[49%] rounded-md cursor-pointer 
                ${isSelected ? 'bg-green-300' : 'bg-gray-300'}
              `}
            >
              <p>{location}</p>
              <p>{branch.address}</p>
              {branch.phoneNumbers?.map((number, index) => (<p key={index}>{number}</p>))}
            </div>
          );
        })}
      </div>

      {/* Confirm Button */}
      <button
        className={`rounded-md w-[200px] py-3 text-white mx-auto mb-10 ${
          choseBranchInfo ? "bg-blue-500" : "bg-gray-200 cursor-not-allowed"
        }`}
        onClick={() => setNext(true)}
        disabled={!choseBranchInfo}
      >
        Chose Time Slot
      </button>

      {next && (
        <div
          className={`
          absolute right-0 top-0 h-full w-full bg-white
        `}
        >
          <ChoseDateTime
            setAppointment={setAppointment}
            setNext={setNext}
            vendor={vendor}
            product={product}
            userId={userId}
            branchInfo={choseBranchInfo}
          />
        </div>
      )}
    </div>
  );
}

export default ChoseBranch;