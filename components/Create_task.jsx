import { useState, useEffect } from 'react';
const GridComponent = () => {
  useEffect(() => {
    const data = await fetch('http://localhost:8000/allticket/{1}');
      const result = await data.json();
    
    setSeatsData(fetchedData);
  }, []);
  return (
    <div className="w-full h-screen flex justify-center bg-black ">
    <div className="flex flex-col justify-center items-center bg-black text-white">
      <div className="border-2 border-green-400 rounded-xl p-2">
        Tickets For kk Travels
      </div>
      <br />
      <div className="flex flex-col  items-center border-2 border-green-500 rounded-xl p-10">
        <div className="flex gap-10 ">
          <div className="grid grid-cols-3 gap-[10px]">
            {/* Add the grid items */}
            {[1, 2, 3, 7, 8, 9, 13, 14, 15, 19, 20, 21, 25, 26, 27, 31, 32, 33, 37, 38, 39, 43, 44, 45, 49, 50, 51].map(
              (item) => (
                <button type="submit" key={item} className="grid-item border-2 bg-red-600 border-green-500 p-2 text-center rounded-md">
                  {item}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-3 gap-[10px]">
            {/* Add the grid items */}
            {[4, 5, 6, 10, 11, 12, 16, 17, 18, 22, 23, 24, 28, 29, 30, 34, 35, 36, 40, 41, 42, 46, 47, 48, 52, 53, 54].map(
              (item) => (
                <button type="submit" key={item} className="grid-item border-2 border-green-500 p-2 text-center rounded-md">
                  {item}
                </button>
              )
            )}
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

/* const seats = [
  { sno: '1', s:'true' },{ sno: '2', s:'true' },{ sno: '3', s:'true' },
  { sno: '7', s:'true' },{ sno: '8', s:'true' },{ sno: '9', s:'true' },
  { sno: '13', s:'true' },{ sno: '13', s:'true' },{ sno: '14', s:'true' },
  { sno: '19', s:'true' },{ sno: '20', s:'true' },{ sno: '21', s:'true' },
  { sno: '25', s:'true' },{ sno: '26', s:'true' },{ sno: '27', s:'true' },
  { sno: '31', s:'true' },{ sno: '32', s:'true' },{ sno: '33', s:'true' },
  { sno: '37', s:'true' },{ sno: '38', s:'true' },{ sno: '39', s:'true' },
  { sno: '43', s:'true' },{ sno: '44', s:'true' },{ sno: '45', s:'true' },
  { sno: '49', s:'true' },{ sno: '50', s:'true' },{ sno: '51', s:'true' }
]; */