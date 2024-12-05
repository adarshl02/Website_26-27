import React from "react";
import { useSelector } from "react-redux";
import { Meteors, MeteorsPremium } from "./../components/accertinityui/Meteor";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Profile() {
  const user = useSelector((state) => state.user.currentUser); // Assuming user data is stored in the redux state

  return (
    <div className="flex flex-col items-center mt-20 text-lg px-4 sm:px-6 ">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">My Pratibimb Card</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-4xl mx-auto space-y-8 sm:space-y-0 sm:space-x-8">
        {/* Illustration Section */}
        <div className="w-full sm:w-1/2">
          <img className="w-full max-w-xs mx-auto sm:w-[400px]" src="/Saly.png" alt="Illustration" />
        </div>

        {/* Profile Card */}
        <div className="relative max-w-sm w-full sm:w-1/2">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.85] rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-6 py-8 sm:px-8 sm:py-12 rounded-2xl flex flex-col items-center text-white overflow-hidden">
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-700 shadow-md"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 relative">{user.name}</h2>
            <p className="text-base sm:text-lg text-slate-400 mb-2 relative">{user.email}</p>
            <p className="text-base sm:text-lg mb-2 relative">Batch: {user.batch}</p>
            <p className="text-base sm:text-lg mb-2 relative">Branch: {user.branch}</p>
            <p className="text-base sm:text-lg mb-4 relative">
              Non-Member
            </p>
            <button
              className="flex items-center px-4 py-2 bg-yellow-400 text-slate-800 font-poppins rounded-2xl hover:bg-yellow-300"
            >
              Claim your membership now
              <ArrowForwardIcon className="ml-2" />
            </button>
            {/* Meaty part - Meteor effect */}
            <div className="absolute inset-0 overflow-hidden">
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Member Section */}
      <div className="relative max-w-sm w-full sm:w-1/2 mt-8">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-yellow-600 to-yellow-900 transform scale-[0.85] rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gradient-to-r from-yellow-600 via-yellow-600 to-yellow-800 border border-yellow-800 px-6 py-8 sm:px-8 sm:py-12 rounded-2xl flex flex-col items-center text-white overflow-hidden">
          <div className="relative mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-700 shadow-md"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 relative ">{user.name}</h2>
          <p className="text-base sm:text-lg text-yellow-100 mb-2 relative ">{user.email}</p>
          <p className="text-base sm:text-lg mb-2 relative ">Batch: {user.batch}</p>
          <p className="text-base sm:text-lg mb-2 relative ">Branch: {user.branch}</p>
          <p className="text-base sm:text-lg mb-4 relative">
            Member
          </p>
          {/* Meaty part - Meteor effect */}
          <div className="absolute inset-0 overflow-hidden">
            <MeteorsPremium number={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
