import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner"; // Corrected import
import { markAttendee } from "../service/api2"
import { toast } from "sonner";

const QRCodeAttendance = () => {
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");
  const [attendee, setAttendee] = useState(null);

  // Handle QR Code Scan
  const handleScan = async (data) => {
    
    if (data && data[0].rawValue) { 
      const razorpay_order_id = data[0].rawValue.split(':')[1].trim(); 
      setScanResult(data[0].rawValue);
      try {
        const data={
            qrCodeData: razorpay_order_id,
        }
        const res = await markAttendee(data)

        setMessage(res.data.message);
        
        if (res.data.attendee) {
          setAttendee(res.data.attendee);
          toast.success("Attendance fetched successfully!");
        }

      } catch (err) {
        setMessage(err.response?.data?.message || "Error marking attendance");
        toast.error("Error marking attendance!");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4   mt-4 font-poppins   mb-16">
      <h1 className="font-semibold text-blue-500 text-center text-lg">QR Code Attendance System</h1>
      
      <div className="px-12 md:max-w-xs py-4">
        <h2 className="text-base text-gray-700">Scan QR Code</h2>
        <Scanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "200px", margin: "0 auto" }}
        />
      </div>

      {
        scanResult==="" && 
        <div className="text-center px-2 py-2">
        <div className="mt-2 flex flex-col gap-4 font-poppins text-base md:text-lg">
          <div className="bg-slate-200 px-4 py-2 rounded-2xl">
            <div className="text-slate-700 font-medium">
              Data Scanned will appear here
            </div>
            <div className="text-slate-600 text-xs md:text-base">
              Scan the attendee qr code to get its data stored in our database and mark it as attended.
            </div>
          </div>

        </div>
        
      </div>
      }

      {scanResult && (
        <div className="bg-white p-2 rounded-lg shadow-md mt-1 w-full max-w-md text-center">
          <h3 className="text-sm font-medium text-gray-800">Scanned Data:</h3>
          <p className="text-gray-600 text-xs">{scanResult}</p>
        </div>
      )}

      {message && (
        <div className="bg-white p-2 rounded-lg shadow-md mt-2 w-full max-w-md text-center">
          <h3 className="text-sm font-medium text-gray-800">Status:</h3>
          <p className={`text-lg ${message.includes("Error") ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
        </div>
      )}

      {attendee && (
        <div className="bg-white p-2 rounded-lg shadow-md mt-4 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-800">Attendee Details:</h3>
          <div className="p-1 text-sm">
            <p className="text-gray-700"><strong>Name:</strong> {attendee.attendee_name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {attendee.attendee_email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {attendee.attendee_phone}</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">Team Details:</h3>
            <p className="text-gray-700"><strong>Team:</strong> {attendee.team_name}</p>
            <p className="text-gray-700"><strong>Team:</strong> {attendee.team_members}</p>
            <p className="text-gray-700"><strong>Status:</strong> {attendee.is_attended ? "Attended" : "Not Attended"}</p>
            <h3 className="text-lg font-semibold text-gray-800 mt-2">Event Details:</h3>
            <p className="text-gray-700">Pixshala "Enhance the Aesthetics"</p>
            <p className="text-gray-700">Early bird phase 2"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeAttendance;
