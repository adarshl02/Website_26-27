import React from "react";

export default function AdminHeader({ activeTab, setActiveTab }) {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-2 rounded-lg">
      
      <div className="flex gap-4">
        <button
          className={`px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "QR Scanner"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("QR Scanner")}
        >
          QR Scanner
        </button>

        <button
          className={`px-2 py-1 md:px-4 md:py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "PreRegistration"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("PreRegistration")}
        >
          Pre Registration
        </button>
      </div>
    </div>
  );
}
