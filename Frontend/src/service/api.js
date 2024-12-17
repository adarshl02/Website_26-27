import axios from 'axios';

const URL = import.meta.env.VITE_URL; 

const handleApiError = (error, apiName) => {
  const errorMsg = error.response?.data?.message || error.message || 'An unexpected error occurred';
  console.log(`Error in ${apiName}:`, errorMsg);
  return { success: false, message: errorMsg, status: error.response?.status };
};

export const authenticateGoogleSignup = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google/signup`, data, { withCredentials: true } );
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Google Login API');
  }
};

export const authenticateGoogleLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google/signin`, data,  { withCredentials: true } );
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Google Login API');
  }
};

export const logoutUser = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/signout`); 
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error, 'Logout API'); 
    }
  };
  
  export const fetchEventsByStatus = async (status) => {
    try {
      const response = await axios.get(`${URL}/api/get/events?status=${status}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error, 'Fetch Events by Status API');
    }
  };

  export const registerEvent = async (data) => {
    try {
      const { event_id, ...payload } = data;
      const response = await axios.post(`${URL}/api/register?event_id=${event_id}`, payload);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error, 'Event Registration API');
    }
  }; 

  export const registerVolunteer = async (data) => {
    try {

      const response = await axios.post(`${URL}/api/register/volunteer`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error, 'Volunteer Registration API');
    }
  }; 

  export const verifyPayment = async (data) => {
    try {
      const response = await axios.post(`${URL}/api/payment/verify`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error, 'Payment Verification API');
    }
  };  