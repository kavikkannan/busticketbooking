import Header_LPage from '@/components/Header_LPage';
import BusTicketBookingLanding from '@/components/Body_LPage';
import React from 'react';
export default function Home() {
  return (
    <div> 
      <div >
        <Header_LPage/>
      </div>
      <BusTicketBookingLanding/>
    </div>
  );
}