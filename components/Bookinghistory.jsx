'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Bookinghistory = () => {
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatNumbers, setSeatNumbers] = useState({});
  const [busDetails, setBusDetails] = useState({});
  const [u, setU] = useState(null);

  useEffect(() => {
    const useremail = sessionStorage.getItem('USEREMAIL');
    if (!useremail) {
      router.push('/login');
    }
  }, []);
  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        const u = await fetch(`http://localhost:9000/api/user`,{
      method : "GET",
      mode : "cors",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
       })
    const user= await u.json();
       let userid= user.id;
       setU(userid);
        const response = await fetch(`http://localhost:8000/bookeduser/${userid}`);
        if (response.ok) {
          const data = await response.json();
          setSeatsData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSeatsData();
  }, []);

  const fetchBusDetails = async (busId) => {
    try {
      const response = await fetch(`http://localhost:8000/bus/${busId}`);
      if (response.ok) {
        const data = await response.json();
        // Set the bus details state
        setBusDetails(data);
      } else {
        console.error('Failed to fetch bus details');
      }
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

  const fetchSeatNumber = async (busId) => {
    try {
      await fetchBusDetails(busId);
      const response = await fetch(`http://localhost:8000/bookedticket/${busId}`);
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
      const response1 = await fetch(`http://localhost:8000/bus/${busId}`);
      if (response.ok) {
        const data = await response.json();
        
      } else {
        console.error('Failed to fetch seat numbers');
      }
    } catch (error) {
      console.error('Error fetching seat numbers:', error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center bg-black">
      <Link className='absolute top-3 left-2' href='/ticket_main'>home</Link>
      <div className="flex flex-col justify-between items-center bg-black text-white">
        <div className="border-2 border-green-400 rounded-xl p-2 pr-4">
          your tickets
        </div>
        <br />
        <div className='flex flex-col'>
          {seatsData.map((seat) => (
            <div key={seat.id} className=" w-[100vw] h-fit items-center border-2 border-green-500 rounded-xl p-4 ">
              <div className='flex justify-between gap-1 pb-2'>
                <h1>busname: {busDetails.busname}</h1>
                <h1>from: {busDetails.from}</h1>
                <h1>to: {busDetails.to}</h1>
              </div>
              <div className="flex gap-10">
                <div className="flex gap-[10px]">
                  <button onClick={() => fetchSeatNumber(seat.busid)}>
                    view
                  </button>
                  {seatNumbers[seat.busid] && seatNumbers[seat.busid].map((seatNumber) => (
                    <p key={seatNumber} className={`grid-item border-2 p-2 text-center text-green-200 rounded-md border-green-500`}>
                      {seatNumber}
                    </p>
                  ))}
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
