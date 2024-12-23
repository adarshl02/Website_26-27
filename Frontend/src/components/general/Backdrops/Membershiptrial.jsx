import React from "react";

export default function Membershiptrial() {
  return (
    <div className="flex justify-center items-center bg-slate-50 rounded-lg shadow-lg m-2 md:m-4 p-1 md:p-8 max-w-80 md:max-w-xl">
      <div className="w-1/2 text-base md:text-2xl bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text tracking-tight text-transparent  text-center font-poppins">
        The Membership campaign feature isn't available yet! <br />
        <div className="mt-2 " > Stay tuned—it's coming soon!</div>
       
      </div>
      <div className="w-1/2" >
      <img
        src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734951776/tcxtqwgmqhogfggy14n7.jpg"
        alt="image"
        className="md:mt-4 h-36 md:h-48"
      />
      </div>
    </div>
  );
}
