import React, { useState } from 'react'
import QRCodeAttendance from './../adminComponents/QRCodeAttendance';
import PreRegistration from '@/adminComponents/PreRegistration';
import AdminHeader from '@/adminComponents/AdminHeader';
import ActiveAdmins from '@/adminComponents/ActiveAdmins';

export default function AdminDashboard() {

  const [activeTab, setActiveTab] = useState("PreRegistration");

  return (
    <div className='px-2 mt-4'>
      <div className='fixed md:static top-0 w-full z-40 bg-azure' >
       <div className=" text-center py-2 md:mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Admin Dashboard
        </div>
       <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
       </div>
      <div className="mt-24">
      
        {activeTab === "QR Scanner" && <QRCodeAttendance />}
        {activeTab === "PreRegistration" && <PreRegistration />}
        {activeTab === "LoggedinAccounts" && <ActiveAdmins />}
        </div>
    </div>
  )
}
