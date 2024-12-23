import React from "react";

export const Ticket = ({ eventTicketData }) => {
  return (
    <div className="w-full  mx-auto bg-gray-100 rounded-lg shadow-lg my-2 md:w-[60%]">
      <div className="flex">
        {/* Ticket Type Section */}
        <div className="bg-yellow-400 text-black flex flex-col items-center justify-center w-12 md:w-16 font-sans">
          <div className="text-xs md:text-base transform -rotate-90">CLUB<span className="ml-2">PRATIBIMB</span></div>
          

        </div>

        {/* Main Ticket Details */}
        <div className="flex-1 pl-4 md:pl-8 p-2 md:p-4 text-sm md:text-base">
          <h1 className="text-2xl font-bold mb-2">{eventTicketData.title}</h1>
          <div className="mb-2">
            <div className=" mb-1 md:mb-4">
              <div className="font-semibold">Name:</div> {eventTicketData.attendee_name}
            </div>
            <div className="mb-1 md:mb-4">
              <div className="font-semibold">Team Name:</div> {eventTicketData.team_name}
            </div>
          </div>
          <div className="mb-1 md:mb-4">
            <span className="font-semibold">Team Members:</span>{" "}
            {eventTicketData.team_members}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center py-2">
          <p className="text-sm md:text-base text-gray-600">Scan to check in</p>
          <div className="bg-white border border-gray-300 p-2 rounded-md">
            <img
              src={eventTicketData.qr_code}
              alt="QR Code"
              className="w-20 h-20 md:w-28 md:h-28"
            />
          </div>
          <p className="text-xs md:text-sm mt-2 text-gray-600">ID: {eventTicketData.order_id}</p>
        </div>
      </div>
    </div>
  );
};