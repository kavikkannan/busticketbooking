'use client';
import { useState, useEffect } from 'react';

const GridComponent = () => {
  const [seatsData, setSeatsData] = useState([]);

  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        const busId = 'YOUR_BUS_ID_HERE'; // Replace with the actual bus ID
        const response = await fetch(`http://localhost:8000/allticket/${1}`);
        if (response) {
          const data = await response.json();
          setSeatsData(data);
           // Assuming data is an array of objects with seat info
        } else {
          // Handle error if needed
          console.error('Failed to fetch data');
        }
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching data:', error);
      }
    };

    fetchSeatsData();
  }, []);

  const handleSeatBooking = async (seatId) => {
    try {
      // Replace this section with actual API call to update booking status
      const response = await fetch(`http://localhost:8000/bookticket/${1}`, {
        method: 'PUT',
        body: JSON.stringify({ bookedstatus: true }), 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        const updatedSeats = seatsData.map((seat) =>
          seat.seatid === seatId ? { ...seat, bookedstatus: true } : seat
        );
        setSeatsData(updatedSeats);
      } else {
        // Handle error if needed
        console.error('Failed to book seat');
      }
    } catch (error) {
      // Handle error if needed
      console.error('Error booking seat:', error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center bg-black">
      <div className="flex flex-col justify-center items-center bg-black text-white">
      <div className="border-2 border-green-400 rounded-xl p-2">
        Tickets For kk Travels
      </div>
      <br />
      <div className="flex flex-col  items-center border-2 border-green-500 rounded-xl p-10">
        <div className="flex gap-10 ">
          <div className="grid grid-cols-3 gap-[10px]">
            {/* {seatsData1.map((seat) => (
              <button
                key={seat.seatid}
                className={`grid-item border-2 p-2 text-center rounded-md ${
                  seat.bookedstatus ? 'bg-red-500 border-green-500' : ' border-green-500'
                }`}
                onClick={() => !seat.bookedstatus && handleSeatBooking(seat.seatid)}
                disabled={seat.bookedstatus}
              >
                {seat.seatnumber}
              </button>
            ))} */}
          </div>
          <div className="grid grid-cols-3 gap-[10px]">
          {seatsData.map((seat) => (
              <button
                key={seat.seatid}
                className={`grid-item border-2 p-2 text-center rounded-md ${
                  seat.bookedstatus ? 'bg-red-500 border-green-500' : ' border-green-500'
                }`}
                onClick={() => !seat.bookedstatus && handleSeatBooking(seat.seatid)}
                disabled={seat.bookedstatus}
              >
                {seat.seatnumber}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-[7px] p-2">
          {[55, 56, 57, 58, 59, 60, 61].map((item) => (
            <button type="submit" key={item} className=" border-2 bg-green-400 border-green-500 p-2 text-center rounded-md">
              {item}
            </button>
          ))}
        </div>

        <div className="legend flex items-center mt-4">
          <div className="bg-green-200 text-black border-2 border-green-500 p-2 rounded-md mr-2"></div>
          <span>Selected</span>
          <div className=" bg-red-500 text-black border-2 border-green-500 p-2 rounded-md ml-4 mr-2"></div>
          <span>Booked</span>
          <div className=" border-2 border-green-500 p-2 rounded-md ml-4 mr-2"></div>
          <span>Not Booked</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GridComponent;
