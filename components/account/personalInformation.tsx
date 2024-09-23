import useAuthUser from "@/hooks/user";
import { useEffect, useState } from "react";
import EditAccount from "./editAccount";

function PersonalInformation() {
  const [editFirstName, setEditFirstName] = useState<boolean>(false);
  const [editLastName, setEditLastName] = useState<boolean>(false);
  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [editPhone, setEditPhone] = useState<boolean>(false);
  const [savedInputs, setSavedInputs] = useState({
    firstName:  "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [inputs, setInputs] = useState({
    firstName:  "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    repeatPassword: ""
  })

  const [theuser] = useAuthUser();
  const user = theuser;

  useEffect(() => {
    if (theuser) {
      setInputs({
        firstName: theuser.firstName || "",
        lastName: theuser.lastName || "",
        email: theuser.email || "",
        phone: theuser.phone || "",
        currentPassword: "",
        newPassword: "",
        repeatPassword: ""
      });
      setSavedInputs({
        firstName: theuser.firstName || "",
        lastName: theuser.lastName || "",
        email: theuser.email || "",
        phone: theuser.phone || "",
      })
    }
  }, [theuser]);

  if (!user) return;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(inputs);

  return (
    <div className="relative">
      <EditAccount
        statement={"First Name"}
        answer={savedInputs.firstName}
        edit={editFirstName}
        setEdit={setEditFirstName}
        editText={"Edit First name"}
        name={"firstName"}
        value={inputs.firstName}
        handleChange={handleChange}
        setSavedInputs={setSavedInputs}
        userId={user.id}
      />
      <EditAccount
        statement={"Last Name"}
        answer={savedInputs.lastName}
        edit={editLastName}
        setEdit={setEditLastName}
        editText={"Edit Last name"}
        name={"lastName"}
        value={inputs.lastName}
        handleChange={handleChange}
        setSavedInputs={setSavedInputs}
        userId={user.id}
      />
      <EditAccount
        statement={"Email Address"}
        answer={savedInputs.email}
        edit={editEmail}
        setEdit={setEditEmail}
        editText={"Change Email"}
        name={"email"}
        value={inputs.email}
        handleChange={handleChange}
        setSavedInputs={setSavedInputs}
        userId={user.id}
      />
      <EditAccount
        statement={"Phone Number"}
        answer={savedInputs.phone}
        edit={editPhone}
        setEdit={setEditPhone}
        editText={"Change Phone Number"}
        name={"phone"}
        value={inputs.phone}
        handleChange={handleChange}
        setSavedInputs={setSavedInputs}
        userId={user.id}
      />


      <div>
        <h3 className="font-bold mt-5 mb-1">Password</h3>
        <form className="flex">
          <input
            placeholder="Current Password"
            className="mr-5 py-2 rounded-md text-center"
          />
          <input
            placeholder="New Password"
            className="mr-5 py-2 rounded-md text-center"
          />
          <div className="relative flex flex-col">
            <input
              placeholder="Confirm New Password"
              className="mr-5 py-2 rounded-md text-center"
            />
            <button className="absolute py-2 bg-[#acacac] text-[white] px-2 rounded-md top-[50px]">Confirm New Password</button>
          </div>
        </form>
    </div>

      <p className="text-[12px] mt-1">can&apos;t rememeber you current password? <span className="font-bold underline">Reset Password</span></p>

      <h3 className="font-bold mt-10">Delete Account</h3>
      <p className="text-[12px]">Deleting your account will permanently delete all your account activity, gems, information & history...</p>
      <p className="text-[12px]">Are you sure you want to delete your account?</p>
      <p className="text-[12px] text-[red]">Yes, I want to delete my account.</p>
    </div>
  );
}

export default PersonalInformation;