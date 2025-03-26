import React from "react";

export default function UpcomingEventNotReleased() {
  return (
    <div className="flex justify-center items-center bg-slate-50 rounded-lg shadow-lg m-4 p-4 md:p-8 max-w-80 md:max-w-lg mx-auto">
      <div className="w-1/2 text-xl md:text-3xl bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text tracking-tight text-transparent mb-4 md:mb-6 text-center font-poppins">
        Our Event is not released yet :) <br/>Stay tuned with us.
      </div>
      {/* <div>
      <video
        src="/Closed.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="mt-4 h-36 md:h-48"
      />
      </div> */}
      <div className="w-1/2" >
      <img
        src="https://res.cloudinary.com/dhy548whh/image/upload/v1739046844/404-error_umfluy.png"
        alt="image"
        className="md:mt-4 h-36 md:h-48"
      />
      </div>
    </div>
  );
}
