import React from "react";

export default function UpcomingEventNotReleased() {
  return (
    <div className="flex justify-center align-baseline bg-slate-50 rounded-lg shadow-lg m-2 md:m-4 p-2 md:p-8 max-w-80 md:max-w-xl mx-auto ">
      <h2 className="text-lg md:text-2xl bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text tracking-tight text-transparent mb-4 md:mb-6 text-center font-poppins">
      Our website is currently down for maintenance and will be available again at 9 AM. We appreciate your patience and look forward to serving you soon! <br /> <br />
        We'll be back soon!
      </h2>

      {/* <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951776/tcxtqwgmqhogfggy14n7.jpg"
        alt="image"
        className="mt-6 md:mt-4 h-36 md:h-48"
      /> */}
    </div>
  );
}
