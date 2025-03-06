import dayjs from "dayjs";
import React from "react";

export const Ticketorg = ({ eventTicketData }) => {
  return (
    <div
      className="w-[1100px] h-[700px] bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden relative"
      style={{ width: "1100px", height: "700px" }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
        <img src="/PratibimbLogo.png" alt="Club Logo" className="h-20" />
        <h1 className="text-3xl font-semibold text-gray-700">Event Ticket</h1>
      </div>

      {/* Main Ticket Section */}
      <div className="flex mt-4 px-6">
        <div className="bg-yellow-400 text-black flex flex-col items-center justify-center w-12 md:w-16 font-sans">
          <div className="text-xs md:text-base transform -rotate-90">
            CLUB<span className="ml-2">PRATIBIMB</span>
          </div>
        </div>

        {/* Ticket Left Section */}
        <div className="flex-1 bg-gray-100 p-4 rounded-l-md">
          {/* Booking Details */}
          <div className="text-sm text-gray-700">
            <p>
            <span className="font-medium">Booking Date:</span> {dayjs(eventTicketData.created_at).format("DD MMMM, YYYY")}
            </p>
            <p>
              <span className="font-medium">Booking ID:</span> {eventTicketData.order_id}
            </p>
          </div>

          {/* Attendee Details */}
          <div className="mt-4 text-sm text-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendee Details:</h3>
            <p>
              <span className="font-medium">Team Leader:</span> {eventTicketData.team_leader_name}
            </p>
            <p>
              <span className="font-medium">Phone No.:</span> {eventTicketData.team_leader_phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {eventTicketData.team_leader_email}
            </p>
            <p>
              <span className="font-medium">Team Name:</span> {eventTicketData.team_name}
            </p>
          </div>

          {/* Event Details */}
          <div className="mt-6 text-sm text-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Details:</h3>
            <p>
              <span className="font-medium">Event Name:</span> Graffathon'25"
            </p>
            <p>
              <span className="font-medium">Event Date:</span> 08-09 March, 2025
            </p>
            <p>
              <span className="font-medium">Location:</span> Director office Road ,SGSITS Campus , Indore
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center bg-gray-200 px-6 py-4 rounded-r-md">
          <p className="text-sm text-gray-600 mb-2">Scan to Check-In</p>
          <div className="bg-white border border-gray-400 p-4 rounded-md">
            <img
              src={eventTicketData.qr_code_link}
              alt="QR Code"
              className="h-40 w-40"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        Powered by Club Pratibimb. © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </div>
  );
};
