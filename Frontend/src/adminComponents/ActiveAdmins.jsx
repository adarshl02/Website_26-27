import { getAdmins } from '@/service/api2';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';

const ActiveAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const response = await getAdmins(token);
        if (response.success) {
          setAdmins(response.data);
        } else {
          setError("Failed to fetch admins");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [token]);

  const formatCreatedAt = (timestamp) => {
    if (!timestamp) return 'No date available';
    
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <PulseLoader color="#3B82F6" size={12} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Active Admins</h3>
        <p className="mt-1 text-sm text-gray-500">List of currently active administrators</p>
      </div>
      <div className="divide-y divide-gray-200">
        {admins.map((admin) => (
          <div key={admin.id} className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                {admin.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">{admin.name}</h4>
                <p className={`text-sm ${
                  admin.lastActive === "Online now" ? 
                  'text-green-600' : 
                  'text-gray-500'
                }`}>
                  Created At: {formatCreatedAt(admin.created_at)}
                </p>
              </div>
            </div>
            
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
              </div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveAdmins;