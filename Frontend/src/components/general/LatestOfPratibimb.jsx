import React, { useState } from "react";
import { motion } from "framer-motion";


const LatestOfPratibimb = ({handleOpen}) => {



  return (
    <div className="bg-slate-700 rounded-md  p-4 md:p-8 flex justify-center">
      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
        <div className="flex flex-col">
          <span className="text-3xl md:text-5xl">Latest of </span>
          <span className="text-4xl md:text-6xl mb-6">Pratibimb</span>
          <div className="text-sm">
            Explore the latest adventure in art, culture, and creativity. From
            vibrant exhibitions to inspiring showcases, Pratibimb continues to
            be a beacon of innovation. <span className="hidden md:block" >Dive into the world of artistic
            reflections and witness the merging of tradition with modern
            aesthetics.</span>  
          </div>
        </div>

        {/* Card 1 */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195232/fnwxjpfe99cxoqvg4ri1.png"
            alt="Mystic Mode"
            className="w-40 h-40 object-cover rounded-md mb-4"
          />

          <div className="text-xl font-bold mb-1 md:mb-2">Calling Volunteers</div>
          <div className="text-gray-400 text-sm mb-2 md:mb-4">
            Be a part of the biggest Art event. Tentative Date: Jan, 2024
            <br /> <br />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-full shadow-lg font-bold transition duration-300 hover:opacity-90 hover:shadow-2xl"
            >
              Register Here
            </motion.button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <img
            src="/sepia_poster.png"
            alt="Customise Settings"
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-bold mb-2">
            Conducted Sepia <br />
            "A Whirl of Visuals"
          </h3>
          <p className="text-gray-400 text-sm">
          With around 500 attendees, including 250 participants and 80 teams, the workshop offered a perfect fusion of art & photography.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestOfPratibimb;
