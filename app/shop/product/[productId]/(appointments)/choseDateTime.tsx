import { firestore } from "@/lib/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

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
  branches: Branch[];
}

interface Vendor {
  docID: string;
  name: string;
  branches: Branch[];
}
interface TimeSlot {
  time: string;
  available: boolean;
}
interface Props {
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  vendor: Vendor;
  product: Product;
}
function ChoseDateTime({ setNext, setAppointment, userId, vendor, product }: Props) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [reservedSlots, setReservedSlots] = useState<string[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Handle day selection change
  useEffect(() => {
    if (selectedDay) {
      const date = getNextDateForDay(selectedDay);
      setSelectedDate(date);
      generateTimeSlots(); // Generate new time slots when the day changes
      fetchReservedSlots(date); // Fetch reserved slots for the selected date
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);


  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Function to calculate the next occurrence of the selected day
  const getNextDateForDay = (day: string) => {
    const today = new Date();
    const todayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const targetIndex = daysOfWeek.indexOf(day.toLowerCase());

    let diff = targetIndex - todayIndex;
    if (diff < 0) {
      diff += 7; // If the selected day is earlier in the week, calculate for the next week
    }

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + diff);

    return nextDate.toISOString().split("T")[0];
  };

  // Function to generate time slots
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    let startTime = new Date();
    startTime.setHours(8, 0, 0, 0); // Start at 8:00 AM

    while (startTime.getHours() < 16) {
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + 45); // 45-minute interval

      slots.push({
        time: `${startTime.getHours()}:${startTime.getMinutes() === 0 ? "00" : startTime.getMinutes()} - ${endTime.getHours()}:${endTime.getMinutes() === 0 ? "00" : endTime.getMinutes()}`,
        available: true,
      });

      startTime = endTime; // Move to the next time slot
    }

    setTimeSlots(slots);
  };

  // Fetch reserved time slots from Firestore for the selected date
  const fetchReservedSlots = async (date: string) => {
    const q = query(collection(firestore, "appointments"), where("date", "==", date));
    const querySnapshot = await getDocs(q);

    const reservedTimes: string[] = [];
    querySnapshot.forEach((doc) => {
      reservedTimes.push(doc.data().time);
    });

    setReservedSlots(reservedTimes);
  };

  // Function to handle selecting a time slot
  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time); // Set the selected time slot
  };

  // Function to handle reservation and save to Firestore
  const handleReservation = async () => {
    if (!selectedTimeSlot || !selectedDate) {
      alert("Please select a valid time slot and date.");
      return;
    }

    const appointmentData = {
      date: selectedDate,
      time: selectedTimeSlot,
      vendorName: vendor.name,
      vendorInfo: vendor.branches,
      productName: product.name,
      productPrice: product.price,
      productImage: product.images[0],
      productId: product.docID,
      userId: userId,
      status: "upcoming"
    };

    try {
      await addDoc(collection(firestore, "appointments"), appointmentData);
      alert("Appointment successfully reserved!");
      setAppointment(false); // Close the modal after successful reservation
    } catch (error) {
      console.error("Error reserving appointment: ", error);
      alert("Error reserving appointment, please try again.");
    }
  };

  console.log(selectedDate);
  console.log(selectedTimeSlot);
  return (
    <div className="w-[600px] h-[500px] bg-white rounded-md flex flex-col">
      {/* Header Section */}
      <div className="flex border-b border-[#bebebe] relative justify-center">
        <p onClick={() => setNext(false)} className="absolute left-5 top-4 text-[20px]">
          &lt;
        </p>
        <p className="py-5">Please choose a date and time for appointment</p>
      </div>

      {/* Day of the week dropdown */}
      <div className="px-6 py-4 self-end">
        <select
          id="day-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
        >
          <option value="" disabled>
            Select a day
          </option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Time slots */}
      <div className="flex-1 px-6 py-4 overflow-y-auto w-full flex flex-wrap justify-center">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleTimeSlotSelect(slot.time)}
            className={`block mb-2 p-3 rounded-md mx-2 w-[120px] ${
              reservedSlots.includes(slot.time) // Disable if slot is reserved
                ? "bg-gray-300 cursor-not-allowed"
                : selectedTimeSlot === slot.time // Change color if selected
                ? "bg-blue-500 text-white"
                : "bg-green-200"
            }`}
            disabled={reservedSlots.includes(slot.time)} // Disable button if time slot is reserved
          >
            {slot.time}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      <button 
        className={`rounded-md w-[200px] py-3 text-white mx-auto mb-10 ${selectedTimeSlot ? "bg-[green]" : "bg-gray-300"}`}
        onClick={handleReservation}
      >
        Confirm Reservation
      </button>
    </div>
  );
}

export default ChoseDateTime;