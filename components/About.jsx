import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-green-200 font-bold mb-4">About Our Platform</h1>
        <p className="text-lg text-white mb-8">
          We are committed to revolutionizing the travel experience through innovative technology and exceptional service.
        </p>

        <div className="bg-green-200 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl text-black font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              Our mission is to simplify travel and create seamless journeys for our customers. We strive to offer convenient, reliable, and accessible travel solutions that exceed expectations.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-green-200 font-bold mb-4">Our Vision</h2>
          <p className="text-white mb-6">
            Our vision is to become the preferred platform for travelers worldwide, providing them with an unparalleled travel experience.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-green-200 font-bold mb-4">Our Team</h2>
          <p className="text-white mb-6">
            Behind our platform is a dedicated team of professionals passionate about making travel easier and more enjoyable. We are driven by innovation, customer satisfaction, and a commitment to excellence.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl text-green-200 font-bold mb-4">Contact Us</h2>
          <p className="text-white mb-6">
            Have questions or feedback? We&apos;d love to hear from you! Reach out to our support team at support@example.com for assistance.
          </p>
        </div>

        <p className="text-white mt-8">
          Thank you for choosing our platform. We&apos;re excited to be part of your travel journey!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
