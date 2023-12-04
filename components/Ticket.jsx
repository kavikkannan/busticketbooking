'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from './Loading';
const TicketBooking = () => {
  const router=useRouter();
  const [seatsData, setSeatsData] = useState([]);
  const [leftSideSeats, setLeftSideSeats] = useState([]);
  const [rightSideSeats, setRightSideSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchSeatsData = async () => {
      try {
        const BUSID=sessionStorage.getItem('BUSID');
        const response = await fetch(`https://go-busticket-kk.onrender.com/allticket/${BUSID}`);
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

    if (isSelected) {
      const updatedSelectedSeats = selectedSeats.filter((seat) => seat !== id);
      setSelectedSeats(updatedSelectedSeats);
    } else {
      setSelectedSeats([...selectedSeats, id]);
    }
    const updatedLeftSeats = leftSideSeats.map((seat) =>
      seat.id === id ? { ...seat, isSelected: !isSelected } : seat
    );
    const updatedRightSeats = rightSideSeats.map((seat) =>
      seat.id === id ? { ...seat, isSelected: !isSelected } : seat
    );
    setLeftSideSeats(updatedLeftSeats);
    setRightSideSeats(updatedRightSeats);
  };

  const handleGoBack = () => {
    sessionStorage.removeItem('BUSID');
      router.push('/ticket_main');
  };
  

  const handleConfirmBooking = async () => {
    try {
      let bookedstatus=true;
      setLoading(true);
      for(let i=0;i<selectedSeats.length;i++){
        let b=selectedSeats[i];
        const response = await fetch(`https://go-busticket-kk.onrender.com/bookticket/${b}`, {
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
      
      const u = await fetch(`https://go-jwt-kkk.onrender.com/api/user`,{
      method : "GET",
      mode : "cors",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include",
       })
    const user= await u.json();
       let userid= user.id;
       const BUSID=sessionStorage.getItem('BUSID');
      let busid=parseInt(BUSID, 10);
        const log = await fetch(`https://go-busticket-kk.onrender.com/user/`, {
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
        const response = await fetch(`https://go-busticket-kk.onrender.com/bookdetails/`, {
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
          
        } else {
          console.error('Failed to confirm booking');
        }
      }
      
    } catch (error) {
      console.error('Error confirming booking:', error);
    } finally{
      alert('booking succesful')
      sessionStorage.removeItem('BUSID');
      router.push('/ticket_main');
    }
  };

  return (
    <>
      {loading ? (
          <div className="relative">
          {loading && <Loading />} 
        </div>
      ) : (
  <div className="w-full h-screen flex flex-col justify-center bg-black">
    <div className="flex flex-col gap-2 justify-between items-center bg-black text-white">
      <br />
          <div className='flex flex-col gap-2'>
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
                      
                      onClick={() => !seat.bookedstatus && handleSeatSelection(seat.seatnumber)}
                      disabled={seat.bookedstatus}
                    >
                      {seat.seatnumber}
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
                      
                      onClick={() => !seat.bookedstatus && handleSeatSelection(seat.seatnumber)}
                      disabled={seat.bookedstatus}
                    >
                      {seat.seatnumber}
                    </button>
                  ))}
                </div>
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
              <div className='flex gap-3'>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0}
              >
                Confirm Booking
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={handleGoBack}
                
              >
                go back
              </button>
              </div>
            </div>
  </div>
  )}
  </>
  );
};

export default TicketBooking;
