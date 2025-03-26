import React, { useState } from "react";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";

const LatestOfPratibimb = ({ handleOpen, handleOpen2 }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-700 rounded-md p-4 md:p-8 flex justify-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
        {/* "Latest of Pratibimb" Section */}
        <div className="flex flex-col">
          <span className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600">
            Latest of
          </span>
          <span className="text-4xl md:text-6xl mb-6 font-extrabold">
            Pratibimb
          </span>
          <div className="text-sm text-slate-300 leading-relaxed font-medium font-poppins">
            Uncover a world where art and innovation collide. <br />
            Discover vibrant exhibitions, workshops, and showcases that celebrate
            creativity in all its forms.
            <span className="hidden md:block">
              {" "} <br />
              Experience Pratibimb’s legacy, where tradition meets modernity,
              inspiring every enthusiast to create and reflect.
            </span>
          </div>
        </div>

        {/* Card 1 */}
        <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-2xl border-2 border-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex flex-col items-center text-center">
          <img
            src="https://res.cloudinary.com/dhy548whh/image/upload/v1742982525/c5tnukenlw3w3ycr7rxd.png"
            alt="Upcoming Event"
            className="w-44 h-52 object-cover rounded-md mb-4 shadow-lg"
          />
          <div className="text-xl font-extrabold mb-1 md:mb-2 font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Membership Campaign
          </div>

          <div className="text-gray-300 text-sm mb-1 md:mb-2">
            Get Pratibimb's exclusive Membership. <br />
            <div className="text-slate-400 font-medium opacity-75 mb-2">
              Date: 30 March, 2025
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              //  onClick={handleOpen2}
              onClick={() => navigate("/membership")}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-full shadow-2xl font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Register Now <ArrowForwardIcon />
            </motion.button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="graffathon25poster.png"
            alt="Calling Volunteers"
            className="w-40 h-44 object-cover rounded-md mb-4"
          />
          <div className="text-xl font-bold mb-1 md:mb-2 font-display">
          Graffathon'25
          </div>
          <div className="text-gray-400 text-sm mb-2 md:mb-4">
          An overnight Wall Art competition. <br />
            <span className="text-slate-400 font-medium opacity-75">
              Date: 08 March , 2025
            </span>
            <br /> <br />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              // onClick={() => window.open("https://forms.gle/Je1TaEksBSRpkpdc8", "_blank")}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Explore more
            </motion.button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LatestOfPratibimb;
