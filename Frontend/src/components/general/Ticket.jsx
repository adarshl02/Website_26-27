import React from "react";

export const Ticket = ({ eventTicketData }) => {


    {/* Extract all drive links dynamically */}
    const driveLinks = Object.entries(eventTicketData)
    .filter(([key, value]) => key.includes("_drive_link") && value.trim() !== "")
    .map(([key, value]) => ({
      label: key.replace(/_drive_link/g, "").replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      url: value
    }));

  return (
    <div className="w-full mx-auto bg-gray-100 rounded-lg shadow-lg my-2 md:w-[60%] my-4">
  {/* Club Pratibimb Banner */}
  <div className="bg-yellow-400 text-black text-center py-2 font-sans text-lg md:text-xl font-bold w-full">
    CLUB PRATIBIMB
  </div>
    <div className="p-4" >
  {/* Event Title */}
  <div className="text-center text-lg md:text-2xl font-bold mt-3">Graffathon'25</div>

  {/* Event Details */}
  <div className="text-center text-sm md:text-base text-gray-700 mt-1">
    <p><span className="font-semibold">Date & Time:</span> 8th-9th March 2025, 9:00 AM</p>
    <p><span className="font-semibold">Venue:</span> Director's office Road ,SGSITS Campus , Indore</p>
  </div>

  {/* Ticket Details */}
  <div className="mt-4 text-sm md:text-base text-gray-800 space-y-2">
    <p><span className="font-semibold">Team Lead:</span> {eventTicketData.team_leader_name}</p>
    <p><span className="font-semibold">Team Name:</span> {eventTicketData.team_name}</p>

    {/* Participants List */}
    <div>
      <span className="font-semibold">Participants:</span>
      <ul className="list-disc pl-5 mt-1">
        {[
          eventTicketData.team_leader_name,
          eventTicketData.sec_participant_name,
          eventTicketData.third_participant_name,
          eventTicketData.fourth_participant_name,
          eventTicketData.fifth_participant_name,
          eventTicketData.sixth_participant_name,
          eventTicketData.seventh_participant_name,
          eventTicketData.eighth_participant_name
        ]
          .filter(name => name)
          .map((name, index) => (
            <li key={index}>{name}</li>
          ))}
      </ul>
    </div>

    {/* Payment Status */}
    <p>
      <span className="font-semibold">Payment Status:</span>
      <span
        className={`ml-2 px-2 py-1 text-xs font-bold rounded-md ${
          eventTicketData.payment_status === "APPROVED"
            ? "bg-green-200 text-green-700"
            : "bg-red-200 text-red-700"
        }`}
      >
        {eventTicketData.payment_status}
      </span>
    </p>

    {/* Attendance Status */}
    <p>
      <span className="font-semibold">Check-in Status:</span>
      <span
        className={`ml-2 px-2 py-1 text-xs font-bold rounded-md ${
          eventTicketData.team_leader_attended_1
            ? "bg-green-200 text-green-700"
            : "bg-red-200 text-red-700"
        }`}
      >
        {eventTicketData.team_leader_attended_1 ? "Checked In" : "Not Checked In"}
      </span>
    </p>


{/* Drive Link Submissions */}
{driveLinks.length > 0 && (
  <div className="mt-4">
    <span className="font-semibold">Drive Submissions:</span>
    <ul className="list-disc ml-5 mt-1">
      {driveLinks.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}

  </div>

  {/* QR Code Section */}
  <div className="flex flex-col items-center justify-center mt-6">
    <p className="text-sm md:text-base text-gray-600">Scan to check in</p>
    <div className="bg-white border border-gray-300 rounded-md mt-2">
      <img
        src={eventTicketData.qr_code_link}
        alt="QR Code"
        className="w-full h-full md:w-28 md:h-28"
      />
    </div>
    <p className="text-xs md:text-sm mt-2 text-gray-600">ID: {eventTicketData.order_id}</p>
  </div>
  </div>
</div>

  );
};