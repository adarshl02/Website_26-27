import axios from 'axios';

const URL = import.meta.env.VITE_URL; 

export const authenticateGoogleLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google`, data);
    
    return response;
  } catch (error) {
    console.error("Error in Google Login API:", error);
    return error.response; 
  }
};

export const logoutUser = async () => {
    try {
      const response = await axios.get(`${URL}/api/auth/signout`); 

      return response;
    } catch (error) {
      console.error("Error in Logout API:", error);
      return error.response; 
    }
  };
  
  export const fetchEventsByStatus = async (status) => {
    try {
      const response = await axios.get(`${URL}/api/get/events?status=${status}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }; 

  export const registerEvent = async (data) => {
    try {
      const { event_id, ...payload } = data;
      const response = await axios.post(`${URL}/api/register?event_id=${event_id}`, payload);
      return response;
    } catch (error) {
      console.error("Error in Event Registration API:", error);
      return error.response;
    }
  }; 

  export const verifyPayment = async (data) => {
    try {
      const response = await axios.post(`${URL}/api/payment/verify`, data);
      return response;
    } catch (error) {
      console.error("Error in Payment Verification API:", error);
      return error.response;
    }
  };  