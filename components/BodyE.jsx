"use client";

import React, { useState, useEffect } from "react";

export default function bodyM() {

  const [data1, setData1] = useState([]);
  const [selectedFrom, setFromloc] = useState('');
  const [selectedTo, setToloc] = useState('');
  const [selectedDate, setDate] = useState('');

  const handleCheckAvailability = async () => {
    try {
      const data = await fetch('http://localhost:8000/bus/');
      const result = await data.json();

      // Filter the data based on user inputs
      const filteredData = result.filter(
        (bus) => bus.from === selectedFrom && bus.to === selectedTo && bus.date === selectedDate
      );

      // Update state with filtered data
      setData1(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="bg-black min-h-screen ">
      <div className="flex flex-col items-center">
        <div className=" flex justify-center items-center">
          <div className="bg-white">
            <img src="/images/bus.jpg" alt="facilities" />
          </div>
          <div className="flex w-1/2 justify-center  items-center border-2 rounded-lg p-6 border-green-600 ">
            <div className="  mb-4 ">
              <p className="text-green-200 font-bold mb-2">Check Bus Availability</p>
              <form>
                  <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-green-200">
                          From
                        </label>
                        <select
                          className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          value={selectedFrom}
                          onChange={(e) => setFromloc(e.target.value)}
                        >
                          <option value="">Select a city</option>
                          <option value="salem">Salem</option>
                          <option value="chennai">Chennai</option>
                          <option value="bangalore">Bangalore</option>
                          <option value="madurai">Madurai</option>
                        </select>
                  </div>
                  <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-green-200">
                          To
                        </label>
                        <select
                          className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          value={selectedTo}
                          onChange={(e) => setToloc(e.target.value)}
                        >
                          <option value="">Select a city</option>
                          <option value="salem">Salem</option>
                          <option value="chennai">Chennai</option>
                          <option value="bangalore">Bangalore</option>
                          <option value="madurai">Madurai</option>
                        </select>
                  </div>
                  <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-green-200">
                          Journey Date
                        </label>
                        <input
                          id="JDate"
                          name="date"
                          type="date"
                          required
                          onChange={(e) => setDate(e.target.value)}
                          className="block w-full rounded-md p-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-green-300 placeholder:text-green-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                  </div>
              </form>
              <button 
                className=" mt-4 w-full text-green-200 "
                onClick={handleCheckAvailability}
              >
                check
              </button>
            </div>
          </div>
        </div>
        <div className="bg-green-400 w-3/4 rounded-3xl shadow-2lg shadow-green-500/50 h-[3px]"></div>
        
          {/* <div className="flex flex-col relative top-5 gap-10  border rounded-2xl p-5 ">
            <div className="flex gap-10">
              <div>Bus Name</div>
              <div>Travel Duration(hrs)</div>
              <div>Seate (Available)</div>
            </div>
            
            <div className="gap-10">
              <div className="flex p-1 gap-10">
                <div>KK Travels</div>
                <div>3:50</div>
                <div>10</div>
                <button className="hover:text-red-300" onClick={() => handleBook(grievance.id)}>Book</button>

              </div>
              <div className="flex p-1 gap-10">
                <div>II Travels</div>
                <div>2:10    </div>
                <div>2 </div>
                <button className="hover:text-red-300" onClick={() => handleBook(grievance.id)}>Book</button>

              </div>
           </div>
         </div> */}
         <div>
        <table className="shadow-lg text-green-400  relative top-10 flex justify-center  ">
            <tbody>
              <tr >
                <th className=" border text-left px-8 py-4">Bus Name</th>
                <th className=" border text-left px-8 py-4">Travel Duration</th>
                <th className=" border text-left px-8 py-4">Seats(Available)</th>
                <th className=" border text-left px-8 py-4">Book Now</th>
              </tr>
              {data1.map((bus) => (
            <tr className="text-green-200" key={bus.id}>
              <td className="border px-8 py-4">{bus.busname}</td>
              <td className="border px-8 py-4">{bus.Duration}</td>
              <td className="border px-8 py-4">{bus.id}</td>
              <td className="border px-8 py-4">
                <button className="hover:text-red-300" onClick={() => handleBook(bus.id)}>
                  Book
                </button>
              </td>
            </tr>
          ))}
              
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
