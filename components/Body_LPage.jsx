import React from "react";

const BusTicketBookingLanding = () => {
  return (
    <div className="py-12 bg-[url('/images/bg1.jpg')] bg-cover">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-green-200 font-bold mb-4">Welcome to Our Bus Ticket Booking System</h1>
        <p className="text-lg text-white mb-8">
          Explore, plan, and book your bus tickets hassle-free with our user-friendly and efficient bus ticket booking system.
        </p>

        <div className="bg-green-200 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl text-black font-bold mb-4">Key Features:</h2>
            <ul className="text-gray-700 mb-6">
              <li className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-black rounded-full flex-shrink-0 mr-2 mt-1"></span>
                <span>Wide Range of Routes: Explore various routes and destinations to find the most suitable journey for you.</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-black rounded-full flex-shrink-0 mr-2 mt-1"></span>
                <span>Flexible Booking: Easily book your tickets with flexible options for seat selection and timing.</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-black rounded-full flex-shrink-0 mr-2 mt-1"></span>
                <span>Real-Time Availability: Check real-time seat availability and choose your preferred seats.</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-black rounded-full flex-shrink-0 mr-2 mt-1"></span>
                <span>Secure Payments: Enjoy secure payment options for a seamless transaction experience.</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-black rounded-full flex-shrink-0 mr-2 mt-1"></span>
                <span>Instant Confirmation: Receive instant confirmation for your bookings.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-green-200 font-bold mb-4">How It Works:</h2>
          <p className="text-white mb-6">
            Search &amp; Select: Enter your travel details, explore available buses, and select your preferred option.
          </p>
          <p className="text-white mb-6">
            Customize &amp; Book: Choose your seats, add passengers&apos; details, and proceed to secure payment.
          </p>
          <p className="text-white mb-6">
            Confirmation &amp; Travel: Get instant confirmation and embark on a hassle-free journey.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-green-200 font-bold mb-4">Get Started:</h2>
          <p className="text-white mb-6">
            Ready to book your bus tickets? Start your journey now by searching for available buses.
          </p>
        </div>

        <p className="text-white mt-8">
          Experience convenience, reliability, and comfort with our bus ticket booking system. Travel hassle-free and make unforgettable memories.
        </p>
      </div>
    </div>
  );
};

export default BusTicketBookingLanding;
