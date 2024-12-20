import axios from 'axios';

const URL = import.meta.env.VITE_URL; 


const handleApiError = (error, apiName) => {
  const errorMsg = error.response?.data?.message || error.message || 'An unexpected error occurred';
  console.log(`Error in ${apiName}:`, errorMsg);
  return { success: false, message: errorMsg, status: error.response?.status };
};

export const authenticateGoogleSignup = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google/signup`, data, { withCredentials: true });
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Google Login API');
  }
};

export const authenticateGoogleLogin = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google/signin`, data, { withCredentials: true });
    return { success: true, data: response.data.response.data };
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

export const fetchEventsByStatus = async (status,token) => {
  try {
    
    const response = await axios.get(`${URL}/api/get/events?status=${status}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`,  // Include token in the headers
      },
    });
    return { success: true, data: response.data.response.data[0]};
  } catch (error) {
    return handleApiError(error, 'Fetch Events by Status API');
  }
};

export const registerEvent = async (data,token) => {
  try {
    
    const { event_id, ...payload } = data;
    const response = await axios.post(`${URL}/api/register?event_id=${event_id}`, payload, {
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Event Registration API');
  }
};

export const registerVolunteer = async (data,token) => {
  try {
    const response = await axios.post(`${URL}/api/register/volunteer`, data, {
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Volunteer Registration API');
  }
};

export const verifyPayment = async (data,token) => {
  try {
    const response = await axios.post(`${URL}/api/payment/verify`, data, {
      headers: {
        "Authorization": `${token}`,  // Include token in the headers
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Payment Verification API');
  }
};

export const uploadArtCommunityDetails = async (formData,token) => {
  try {
    const response = await axios.post(`${URL}/api/art-community`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Specify content type for file uploads
        "Authorization": `${token}`, 
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Art Community API');
  }
};
