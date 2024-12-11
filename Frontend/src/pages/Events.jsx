import React, { useState } from "react";
import PastEvents from "../components/general/EventsComponent/PastEvents";
import RecordEvents from "../components/general/EventsComponent/RecordEvents";
import MiniPratibimb from "../components/general/EventsComponent/MiniPratibimb";

export default function Events() {
  const [selectedOption, setSelectedOption] = useState("Record Events");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="">
    
      {/* Radio Button Group */}
      <div className="pt-28 flex w-full flex-wrap justify-center space-x-2 md:space-x-8 mb-4">
        {["Past Events", "Record Events", "Mini Pratibimb"].map((option) => (
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
              className={`btn font-medium text-xs md:text-sm cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center transition duration-200 ${
                selectedOption === option
                  ? selectedOption === "Record Events"
                    ? "bg-gold text-black border border-gold"
                    : "bg-slate-950 text-white border border-[#4682B4]"
                  : "bg-white text-[#4682B4] border border-[#4682B4] hover:text-white hover:bg-slate-950"
              }`}
              htmlFor={option}
            >
              {option}
            </label>
          </div>
        ))}
      </div>

      {/* <div className="w-4/5 opacity-90 border-t border-gray-400 my-5 mx-auto"></div> */}

      <div className="mt-5">
        {selectedOption === "Past Events" && <PastEvents />}
        {selectedOption === "Record Events" && <RecordEvents />}
        {selectedOption === "Mini Pratibimb" && <MiniPratibimb />}
      </div>
    </div>
  );
}
