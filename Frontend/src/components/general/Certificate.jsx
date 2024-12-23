import React from "react";

const Certificate = ({ user }) => {
  return (
    <div
      id="certificate"
      className="w-[1123px] h-[794px] relative"
      style={{
        width: "1123px", // Match image width
        height: "794px", // Match image height
      }}
    >
      {/* Certificate image */}
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951222/fjfkgmpmqsxetumsln5e.png" // Path to your uploaded image
        alt="Certificate"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* User's name */}
      <div className="absolute text-black text-4xl font-bold text-center font-poppins"
           style={{
             top: "50%", 
             left: "50%",
             transform: "translate(-50%, -50%)",
           }}>
        {user.name}
      </div>
    </div>
  );
};

export default Certificate;
