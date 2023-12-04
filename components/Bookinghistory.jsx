'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Bookinghistory = () => {
  const [seatsData, setSeatsData] = useState([]);
  const [seatNumbers, setSeatNumbers] = useState({});

  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        const u = await fetch(`https://go-jwt-kkk.onrender.com/api/user`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const user = await u.json();
        let userid = user.id;

        const response = await fetch(`https://go-busticket-kk.onrender.com/bookeduser/${userid}`);
        if (response.ok) {
          const data = await response.json();

          const promises = data.map(async ({ userid, busid }) => {
            const [seatResponse, busResponse] = await Promise.all([
              fetch(`https://go-busticket-kk.onrender.com/bookedticket/${busid}`),
              fetch(`https://go-busticket-kk.onrender.com/bus/${busid}`),
            ]);

            const [seatData, busData] = await Promise.all([
              seatResponse.json(),
              busResponse.json(),
            ]);

            return {
              id: seatsData.length + 1,
              userid,
              busid,
              busDetails: busData,
              seatNumbers: seatData.map((item) => item.seatnumber),
            };
          });

          const newData = await Promise.all(promises);

          const uniqueData = [];
          const uniqueKeys = new Set();

          newData.forEach((data) => {
            const key = `${data.userid}-${data.busid}`;
            if (!uniqueKeys.has(key)) {
              uniqueKeys.add(key);
              uniqueData.push(data);
            }
          });

          setSeatsData(uniqueData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSeatsData();
  }, []);



  const fetchSeatNumber = async (busId) => {
    try {
      const response = await fetch(`https://go-busticket-kk.onrender.com/bookedticket/${busId}`);
      if (response.ok) {
        const data = await response.json();
        
        if (data  && data.length > 0) {
          setSeatNumbers((prevSeatNumbers) => ({
            ...prevSeatNumbers,
            [busId]: data.map((item) => item.seatnumber),
          }));
        } else {
          console.error('No seat numbers found for this busId');
        }
      } else {
        console.error('Failed to fetch seat numbers');
      }
    } catch (error) {
      console.error('Error fetching seat numbers:', error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center bg-black text-white">
    <Link className='absolute top-3 left-2 text-green-500' href='/ticket_main'>Home</Link>
    <div className="flex flex-col items-center">
      <div className="border-2 border-green-400 rounded-xl p-2 pr-4 mb-4">
        Your Tickets
      </div>

      <div className='flex flex-col space-y-4'>
        {seatsData.map((seat) => (
          <div key={seat.id} className="w-[80vw] md:w-[60vw] h-fit items-center border-2 border-green-500 rounded-xl p-4 mb-6">
            <div className='flex flex-col md:flex-row justify-between gap-1 pb-2'>
              <h1 className="text-lg">Bus Name: {seat.busDetails.busname}</h1>
              <h1 className="text-lg">From: {seat.busDetails.from}</h1>
              <h1 className="text-lg">To: {seat.busDetails.to}</h1>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-[10px] items-center">
                <button onClick={() => fetchSeatNumber(seat.busid)} className="px-4 py-2 rounded-md bg-green-500 text-white">
                  View Seats
                </button>
                <div className="flex flex-wrap gap-4 mt-4">
                  {seatNumbers[seat.busid] && seatNumbers[seat.busid].map((seatNumber) => (
                    <p key={seatNumber} className="border-2 p-2 text-center text-green-200 rounded-md border-green-500">
                      {seatNumber}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Bookinghistory;
