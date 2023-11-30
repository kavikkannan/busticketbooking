'use client';
import { useState, useEffect } from 'react';

const TicketBooking = () => {

  const [seatsData, setSeatsData] = useState([]);
  const [leftSideSeats, setLeftSideSeats] = useState([]);
  const [rightSideSeats, setRightSideSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isselected, setIsSelected] = useState(false);
  const BUSID=sessionStorage.getItem('BUSID');
  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        
        const response = await fetch(`http://localhost:8000/allticket/${BUSID}`);
        if (response) {
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

  useEffect(() => {
    const totalSeats = seatsData.length;
    const halfLength = Math.ceil(totalSeats / 2);
    const leftSeats = seatsData.slice(0, halfLength);
    const rightSeats = seatsData.slice(halfLength);
    
    setLeftSideSeats(leftSeats);
    setRightSideSeats(rightSeats);
  }, [seatsData]);

  const handleSeatSelection = (id) => {
    const seatIndex = selectedSeats.indexOf(id);
    const isSelected = seatIndex !== -1;
  
    // Toggle seat selection
    if (isSelected) {
      const updatedSelectedSeats = selectedSeats.filter((seat) => seat !== id);
      setSelectedSeats(updatedSelectedSeats);
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
  
    // Toggle seat background color
    const updatedLeftSeats = leftSideSeats.map((seat) =>
      seat.id === id ? { ...seat, isSelected: !isSelected } : seat
    );
    const updatedRightSeats = rightSideSeats.map((seat) =>
      seat.id === id ? { ...seat, isSelected: !isSelected } : seat
    );
    setLeftSideSeats(updatedLeftSeats);
    setRightSideSeats(updatedRightSeats);
  };
  

  const handleConfirmBooking = async () => {
    try {
      let bookedstatus=true;
      
      for(let i=0;i<selectedSeats.length;i++){
        let b=selectedSeats[i];
        const response = await fetch(`http://localhost:8000/bookticket/${b}`, {
          method: 'PUT',
          body: JSON.stringify({ bookedstatus }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('Booking confirmed!');
        } else {
          console.error('Failed to confirm booking');
        }
      }
      
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

      let busid=parseInt(BUSID, 10);
        const log = await fetch(`http://localhost:8000/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "pkglication/json",
        },
        body: JSON.stringify({
          userid,
          busid,
        }),
        
      })

      for(let i=0;i<selectedSeats.length;i++){
        let seatnumber=selectedSeats[i];
        const response = await fetch(`http://localhost:8000/bookdetails/`, {
          method: "POST",
        headers: {
          "Content-Type": "pkglication/json",
        },
        body: JSON.stringify({
          userid,
          busid,
          seatnumber,
        }),
        });
        if (response.ok) {
          console.log('Booking confirmed!');
        } else {
          console.error('Failed to confirm booking');
        }
      }
      
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };
/*   const handleSeatBooking = async (id,bookedstatus) => {
    try {
      const response = await fetch(`http://localhost:8000/bookticket/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ bookedstatus}), 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(bookedstatus){
        console.log(bookedstatus);
      }
      if (response.ok) {
        
        const updatedSeats = seatsData.map((seat) =>
          seat.seatid === id ? { ...seat, bookedstatus: true } : seat
        );
        setSeatsData(updatedSeats);
      } else {
        console.error('Failed to book seat');
      }
    } catch (error) {
      console.error('Error booking seat:', error);
    }
  }; */

  return (
  <div className="w-full h-screen flex flex-col justify-center bg-black">
    <div className="flex flex-col justify-between items-center bg-black text-white">
      <div className="border-2 border-green-400 rounded-xl p-2 pr-4">
        Tickets For kk Travels
      </div>
      <br />
          <div className='flex flex-col'>
            <div className="flex flex-col  items-center border-2 border-green-500 rounded-xl p-10">
              <div className="flex gap-10 ">
                <div className="grid grid-cols-3 gap-[10px]">
                  {leftSideSeats.map((seat) => (
                    <button
                      key={seat.id}
                      className={`grid-item border-2 p-2 text-center rounded-md ${
                        seat.bookedstatus
                          ? 'bg-red-500 border-green-500'
                          : selectedSeats.includes(seat.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-green-500'
                      }`}
                      
                      onClick={() => !seat.bookedstatus && handleSeatSelection(seat.id)}
                      disabled={seat.bookedstatus}
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-[10px]">
                {rightSideSeats.map((seat) => (
                    <button
                      key={seat.id}
                      className={`grid-item border-2 p-2 text-center rounded-md ${
                        seat.bookedstatus
                          ? 'bg-red-500 border-green-500'
                          : selectedSeats.includes(seat.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-green-500'
                      }`}
                      
                      onClick={() => !seat.bookedstatus && handleSeatSelection(seat.id)}
                      disabled={seat.bookedstatus}
                    >
                      {seat.id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-[7px] p-2">
                {/* {[55, 56, 57, 58, 59, 60, 61].map((item) => (
                  <button type="submit" key={item} className=" border-2 bg-green-400 border-green-500 p-2 text-center rounded-md">
                    {item}
                  </button>
                ))} */}
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
    <div className=" w-full flex flex-col gap-3 justify-center items-center">
            
              <div className="mr-4 flex items-center gap-2">
                <h1 className=''>selected seats:</h1>
                  {selectedSeats.map((sseat) => (
                  <p key={sseat}
                  className={`grid-item   border-2 p-2 text-center rounded-md border-green-500`}
                      >
                          {sseat}
                        </p>
                        ))}
              </div>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </button>
            </div>
  </div>
  );
};

export default TicketBooking;
