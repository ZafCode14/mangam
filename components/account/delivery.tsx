import useAuthUser from "@/hooks/user";
import CreateForm from "./createForm";
import FilledForm from "./filledForm";
import Loading from "../loading";
import { useState, useEffect } from 'react';


interface Address {
  country: string;
  governate: string;
  city: string;
  postalCode: string;
  apartment: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  addressId: string;
}
function Delivery() {
  const [theuser, loading] = useAuthUser();
  const [addresses, setAddresses] = useState({});
  const [showCreateNew, setShowCreateNew] = useState(false);
  
  useEffect(() => {
    if (theuser) {
      setAddresses(theuser.addresses);
    }
  }, [theuser]);

  if (loading) {
    return <Loading />;
  }

  if (theuser === null) {
    return null; // Return null or an appropriate fallback
  }

  const handleNewAddress = (newAddress: { id: string; }) => {
    setAddresses((prev) => ({
      ...prev,
      [newAddress.id]: newAddress,
    }));
  };

  return (
    <div>
      {
        addresses && Object.keys(addresses).length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {
              Object.entries(addresses).map(([id, address]) => {
                const addr = address as Address;
                return (
                  <FilledForm
                    key={id}
                    addressId={id}
                    country={addr.country}
                    governate={addr.governate}
                    city={addr.city}
                    postal={addr.postalCode}
                    apartment={addr.apartment}
                    phoneNumber={addr.phoneNumber}
                    firstName={addr.firstName}
                    lastName={addr.lastName}
                    address={addr.address}
                    userId={theuser.id}
                    onAddressAdded={handleNewAddress}
                  />
                )
              })
            }
            <div className={`w-[100vw] h-[100vh] bg-[#000000bb] justify-center ${showCreateNew ? "flex" : "hidden"} items-center absolute top-0 right-0`}>
              <div onClick={() => setShowCreateNew(false)} className="absolute top-[10vw] left-[10vw] w-[50px] h-[50px] text-white text-[70px]">&times;</div>
              <div className="w-[800px] max-w-[95%]">
                <CreateForm
                  userId={theuser.id} 
                  onAddressAdded={handleNewAddress} // Pass the callback function
                  setShowCreateNew={setShowCreateNew}
                />
              </div>
            </div>
            <button onClick={() => setShowCreateNew(true)} className="mb-10 bg-[white] py-2 px-10 rounded-md">New Address</button>
          </div>
        ) : (
          <CreateForm 
            userId={theuser.id} 
            onAddressAdded={handleNewAddress} // Pass the callback function
            setShowCreateNew={setShowCreateNew}
          />
        )
      }
    </div>
  );
}

export default Delivery;