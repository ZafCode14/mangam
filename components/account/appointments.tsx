import { useState } from "react";

function Appointments() {
  const [appointmentTab, setAppointmentTab] = useState<string>("upcoming");

  return (
    <div className="w-full">
      <div className="w-full flex">
        <p 
        onClick={() => setAppointmentTab("upcoming")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 border-b-1 cursor-pointer 
          ${appointmentTab === "upcoming" ? "border-b-2 font-bold" : "border-b"}
        `}>Upcoming</p>
        <p 
        onClick={() => setAppointmentTab("previous")} 
        className={`
          flex justify-center items-center 
          w-[50%] border-black pb-1 cursor-pointer 
          ${appointmentTab === "previous" ? "border-b-2 font-bold" : "border-b"}
        `}>Previous</p>
      </div>
      <div className="flex flex-col justify-center items-center h-[200px]">
        {
          appointmentTab === "upcoming" 
          ?
          <p className="text-[#BF9944] mb-1">You have no upcoming appointments</p>
          : 
          <p className="text-[#BF9944] mb-1">You have no previous appointments</p>
        }
      </div>
    </div>
  )
}

export default Appointments;