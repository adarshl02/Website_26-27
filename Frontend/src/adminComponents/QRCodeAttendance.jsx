import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { getTeamDetails } from "../service/api2";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const QRCodeAttendance = () => {
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");
  const [attendee, setAttendee] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [attendance, setAttendance] = useState({});

  const { token } = useSelector((state) => state.user.currentUser);

  const handleScan = async (data) => {
    if (data && data[0].rawValue) {
      const razorpay_order_id = data[0].rawValue;
      setScanResult(data[0].rawValue);
      try {
        const res = await getTeamDetails(razorpay_order_id, token);
        setMessage(res.data.message);
        if (res.data) {
          setAttendee(res.data);

          // Initialize attendance state for all members
          const initialAttendance = {};
          ["team_leader", "sec", "third", "fourth", "fifth", "sixth", "seventh", "eighth"].forEach((role) => {
            if (res.data[`${role}_participant_name`]) {
              initialAttendance[role] = false;
            }
          });
          setAttendance(initialAttendance);

          toast.success("Attendance data fetched successfully!");
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Error fetching attendance data");
        toast.error("Error fetching attendance!");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  const getDrivePreviewLink = (driveLink) => {
    const match = driveLink.match(/\/d\/(.*)\/view/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : driveLink;
  };

  const handleCheckboxChange = (role) => {
    setAttendance((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const submitAttendance = () => {
    const markedMembers = Object.keys(attendance).filter((key) => attendance[key]);
    if (markedMembers.length === 0) {
      toast.error("No members selected!");
      return;
    }

    console.log("Marked Attendance For:", markedMembers);
    toast.success("Attendance submitted successfully!");
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 mt-4 font-poppins mb-16">
      <h1 className="font-semibold text-blue-500 text-center text-lg">
        QR Code Attendance System
      </h1>

      <div className="px-12 md:max-w-xs py-4">
        <h2 className="text-base text-gray-700">Scan QR Code</h2>
        <Scanner delay={300} onError={handleError} onScan={handleScan} style={{ width: "200px", margin: "0 auto" }} />
      </div>

      {attendee && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-800">All About Team</h3>

          {/* Team Leader Section */}
          <div className="border-b pb-3 mb-3 flex justify-between items-center">
  <div>
    <h4 className="text-blue-600 font-medium">Team Leader</h4>
    <p className="text-gray-700">{attendee.team_leader_name}</p>
    <p className="text-gray-600">{attendee.team_leader_phone}</p>
    {attendee.team_leader_drive_link && (
      <button
        onClick={() => setSelectedDocument(getDrivePreviewLink(attendee.team_leader_drive_link))}
        className="text-sm text-blue-500 underline"
      >
        View Document
      </button>
    )}
  </div>
  <div className="flex gap-4 items-center">
    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={attendance["team_leader_10AM"] || false}
        onChange={() => handleCheckboxChange("team_leader_10AM")}
      />
      <span className="text-sm text-gray-700">10:00 AM</span>
    </label>
    <label className="flex items-center gap-1">
      <input
        type="checkbox"
        checked={attendance["team_leader_10PM"] || false}
        onChange={() => handleCheckboxChange("team_leader_10PM")}
      />
      <span className="text-sm text-gray-700">10:00 PM</span>
    </label>
  </div>
</div>


          {/* Participants Section */}
          <h4 className="text-blue-600 font-medium mb-2">Participants</h4>
          {["sec", "third", "fourth", "fifth", "sixth", "seventh", "eighth"].map((role, index) => {
  if (!attendee[`${role}_participant_name`]) return null;
  return (
    <div key={index} className="border-b pb-3 mb-3 flex justify-between items-center">
      <div>
        <p className="text-gray-700">{attendee[`${role}_participant_name`]}</p>
        <p className="text-gray-600">{attendee[`${role}_participant_phone`]}</p>
        {attendee[`${role}_participant_drive_link`] && (
          <button
            onClick={() => setSelectedDocument(getDrivePreviewLink(attendee[`${role}_participant_drive_link`]))}
            className="text-sm text-blue-500 underline"
          >
            View Document
          </button>
        )}
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={attendance[`${role}_10AM`] || false}
            onChange={() => handleCheckboxChange(`${role}_10AM`)}
          />
          <span className="text-sm text-gray-700">10:00 AM</span>
        </label>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={attendance[`${role}_10PM`] || false}
            onChange={() => handleCheckboxChange(`${role}_10PM`)}
          />
          <span className="text-sm text-gray-700">10:00 PM</span>
        </label>
      </div>
    </div>
  );
})}

        </div>
      )}

      {attendee && (
        <button
          onClick={submitAttendance}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Submit Attendance
        </button>
      )}

      {/* Embedded Google Drive Document Viewer */}
      {selectedDocument && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Document Preview</h3>
        <button 
          onClick={() => setSelectedDocument("")} 
          className="text-red-500 font-bold text-2xl absolute top-2 right-2"
        >
          ✖
        </button>
      </div>
      <iframe
        src={selectedDocument}
        className="w-full h-[60vh] rounded-lg"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
)}

    </div>
  );
};

export default QRCodeAttendance;
