import { useState } from "react";

interface Prop {
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
}

function Appointment({ setAppointment }: Prop) {
  // State to manage the selected day
  const [selectedDay, setSelectedDay] = useState<string>("");

  return (
    <div className="w-[100vw] h-[100vh] fixed flex justify-center items-center top-0 right-0 bg-[#000000a1] z-10">
      <div className="w-[600px] h-[500px] bg-white rounded-md flex flex-col">
        {/* Header Section */}
        <div className="flex border-b border-[#bebebe] relative justify-center">
          <p
            onClick={() => setAppointment(false)}
            className="absolute left-5 top-4 text-[20px]"
          >
            &lt;
          </p>
          <p className="py-5">Please choose a date and time for appointment</p>
        </div>

        {/* Day of the week dropdown */}
        <div className="px-6 py-4 self-end">
          <select
            id="day-select"
            value={selectedDay} // Set the value from state
            onChange={(e) => setSelectedDay(e.target.value)} // Update state when selection changes
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          >
            <option value="" disabled>
              Select a day
            </option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>

        <div className="flex-1"></div>

        {/* Confirm Button */}
        <button className="bg-gray-300 rounded-md w-[200px] py-3 text-white mx-auto mb-10">
          Confirm Reservation
        </button>
      </div>
    </div>
  );
}

export default Appointment;