import axios from 'axios';

const URL = import.meta.env.VITE_URL; 

const handleApiError = (error, apiName) => {
    const errorMsg = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return { success: false, message: errorMsg, status: error.response?.status };
  };


  export const adminLogin = async (data) => {
    try { 
      const response = await axios.post(`${URL}/api/admin/login`, data, { withCredentials: true });
      if (response.status === 204) {
        return { success: false, message: "Invalid Credentials", status: 204 };
      }
      return { success: true, data: response.data.response.data, message:"Welcome" };
    } catch (error) {
      return handleApiError(error, 'Google Login API');
    }
  };

  export const markAttendee = async (data) => {
    try { 
      const response = await axios.post(`${URL}/api/admin/mark-attendance`, data, { withCredentials: true }); 
      return { success: true, data: response.data, message:"Welcome" };
    } catch (error) {
      return handleApiError(error, 'Google Login API');
    }
  };