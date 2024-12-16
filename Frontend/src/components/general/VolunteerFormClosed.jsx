import React from 'react';

export default function VolunteerFormClosed() {
  return (
    <div className="flex justify-center align-baseline bg-slate-50 rounded-lg shadow-lg m-4 p-4 md:p-8 max-w-80 md:max-w-lg mx-auto">
      <h2 className="text-xl md:text-3xl bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text tracking-tight text-transparent mb-4 md:mb-6 text-center font-poppins">
        Sorry :) <br/>We have closed the Volunteer Recruitments
      </h2>
      <video
        src="/Closed.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="mt-4 h-36 md:h-48"
      />
    </div>
  );
}
