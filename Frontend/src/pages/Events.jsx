import React, { useState } from "react";
import PastEvents from "../components/general/EventsComponent/PastEvents";
import MiniPratibimb from "../components/general/EventsComponent/MiniPratibimb";
import Flagship from './../components/general/EventsComponent/Flagship';

export default function Events() {
  const [selectedOption, setSelectedOption] = useState("Overnight Events");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);  
  };

  return (
    <>
    
      {/* Radio Button Group */}
      <div className="pt-28 flex w-full flex-wrap justify-center space-x-2 md:space-x-8 mb-4">
        {["Past Events","Overnight Events","Mini Pratibimb"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              className="btn-check hidden"
              name="eventOptions"
              id={option}
              value={option}
              autoComplete="off"
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            <label
              className={`btn font-bold text-sm md:text-base cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center transition duration-300 ${
                selectedOption === option
                  ? "bg-cyan-500 text-white border-2 border-cyan-500"
                  : "bg-white text-cyan-800 border-2 border-opacity-50 border-cyan-500 hover:text-white hover:bg-cyan-500"
              }`}
              htmlFor={option}
            >
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-5 ">
        {selectedOption === "Past Events" && <PastEvents />}
        {selectedOption === "Overnight Events" && <Flagship />}
        {selectedOption === "Mini Pratibimb" && <MiniPratibimb />}
      </div>
    </>
  );
}
