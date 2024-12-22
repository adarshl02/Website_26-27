import React from "react";

export default function Certificatetrial() {
  return (
    <div className="flex justify-center items-center bg-slate-50 rounded-lg shadow-lg m-2 md:m-4 p-1 md:p-8 max-w-80 md:max-w-xl">
      <div className="w-1/2 text-base md:text-2xl bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text tracking-tight text-transparent  text-center font-poppins">
      Sorry , The Certificate of partition is not been issued with your id. <br />
        <div className="mt-2 text-sm md:text-xl text-slate-400" > Attend a event to get it.</div>
       
      </div>
      <div className="w-1/2" >
      <img
        src="/404-error.png"
        alt="image"
        className="md:mt-4 h-36 md:h-48"
      />
      </div>
    </div>
  );
}
