import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
    const { rest: user } = useSelector((state) => state.user.currentUser);

  return (
    user.email==="teampratibimb@admin.com"? < Outlet/> : <Navigate to="/sign-up"/>
  )
}
