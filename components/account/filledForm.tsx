import CreateForm from "./createForm";
import { useState } from "react";

interface Props {
  country: string;
  governate: string;
  city: string;
  postal: string;
  apartment: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  addressId: string;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddressAdded: (address: { id: string; [key: string]: any }) => void;
}
function FilledForm({
  country,
  governate,
  city,
  postal,
  apartment,
  firstName,
  lastName,
  phoneNumber,
  address,
  addressId,
  userId,
  onAddressAdded
}: Props) {
  const [showCreateNew, setShowCreateNew] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-start mb-10">

      <div className={`w-[100vw] h-[100vh] bg-[#000000bb] justify-center ${showCreateNew ? "flex" : "hidden"} items-center absolute top-0 right-0`}>
        <div onClick={() => setShowCreateNew(false)} className="absolute top-[10vw] left-[10vw] w-[50px] h-[50px] text-white text-[70px]">&times;</div>
        <div className="w-[800px] max-w-[95%]">
          <CreateForm
            userId={userId}
            // Pass existing data for editing
            existingAddress={{
              country,
              governate,
              city,
              postal,
              apartment,
              firstName,
              lastName,
              phoneNumber,
              address,
            }}
            addressId={addressId}
            onAddressAdded={onAddressAdded} // Callback for updating address
            setShowCreateNew={setShowCreateNew}
          />
        </div>
      </div>

      <div className="w-full bg-white flex rounded-md">
          <div className="flex flex-col w-[50%] p-5">
            <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md mb-5 justify-center font-bold">{country}</p>
            <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md mb-5 justify-center font-bold">{governate}</p>
            <div className="flex mb-5">
              <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md w-[50%] mr-5 justify-center font-bold">{city}</p>
              <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md w-[50%] justify-center font-bold">{postal}</p>
            </div>
            <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md justify-center font-bold">{apartment}</p>
          </div>

          <div className="flex flex-col w-[50%] p-5">
            <div className="flex mb-5">
              <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md w-[50%] mr-5 justify-center font-bold">{firstName}</p>
              <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md w-[50%] justify-center font-bold">{lastName}</p>
            </div>
            <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md mb-5 justify-center font-bold">{phoneNumber}</p>
            <p className="bg-[#F1F1F1] flex text-center py-4 rounded-md mb-5 justify-center font-bold">{address}</p>
            <button className="py-5 text-[#C1A875]" onClick={() => setShowCreateNew(true)}>Edit Delivery Address</button>
          </div>
      </div>
    </div>
  );
}

export default FilledForm;