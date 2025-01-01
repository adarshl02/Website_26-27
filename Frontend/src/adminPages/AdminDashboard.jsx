import React from 'react'
import QRCodeAttendance from './../adminComponents/QRCodeAttendance';

export default function AdminDashboard() {
  return (
    <div className='px-4 '>
        <div className="text-center py-2 md:mb-4 bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-7xl font-poppins">
          Admin Dashboard
        </div>
      
    <QRCodeAttendance/>
    </div>
  )
}
