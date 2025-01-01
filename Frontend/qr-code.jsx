import React, { useState } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const App = () => {
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");

  // Handle QR Code Scan
  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      try {
        // Send QR code data to backend
        const res = await axios.post("http://localhost:5000/mark-attendance", {
          qrCodeData: data,
        });

        setMessage(res.data.message);
      } catch (err) {
        setMessage(err.response?.data?.message || "Error marking attendance");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>QR Code Attendance System</h1>

      <div style={{ margin: "20px" }}>
        <h2>Scan QR Code</h2>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
      </div>

      {scanResult && (
        <div>
          <h3>Scanned Data:</h3>
          <p>{scanResult}</p>
        </div>
      )}

      {message && (
        <div>
          <h3>Status:</h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default App;
