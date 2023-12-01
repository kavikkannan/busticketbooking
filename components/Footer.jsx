import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-center py-4 text-white">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Green Wheels. All Rights Reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
