import axios from 'axios';

const URL = import.meta.env.VITE_URL; 


const handleApiError = (error, apiName) => {
  
  const errorMsg = error.response?.data?.errors?.detail ||  error.response?.data?.message || error?.message || 'An unexpected error occurred';
  
  return { success: false, message: errorMsg, status: error.response?.status };
};

export const authenticateGoogleSignup = async (data) => {
  try {
    const response = await axios.post(`${URL}/api/auth/google/signup`, data, { withCredentials: true });
    return { success: true, data: response.data.response.data , message:"Signed Up Successfully!"};
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
    return { success: true, data: response.data ,message:"You're Signed Out!"};
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
       "Authorization": `${token}`, 
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

export const countUsers = async (token) => {
  try {
    const response = await axios.get(`${URL}/api/count-users`, {
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Count User API');
  }
};

export const countArtist = async (token) => {
  try {
    const response = await axios.get(`${URL}/api/get-artists`, {
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });
    
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Count Artist API');
  }
};
export const fetchartcommunity = async (token) => {
  try {
    const response = await axios.get(`${URL}/api/user-art-details`, {
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });
    
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Count Artist API');
  }
};

export const getEventTicket = async (data,token) => {
  try {
    
    const response = await axios.get(`${URL}/api/get/event-ticket`,{
      params: data,
      headers: {
       "Authorization": `${token}`,  // Include token in the headers
      },
    });  
    if (response.status === 204) {
      return { success: false, message: "User is not registered for the event.", status: 204 };
    }
        return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Get event ticket API');
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
        "Content-Type": "multipart/form-data", 
        "Authorization": `${token}`, 
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error, 'Art Community API');
  }
};

export const submitfeedback = async (data,token) => {
  try {
    const response = await axios.post(`${URL}/api/give-feedback`, data, {
      headers: {
        "Authorization": `${token}`, 
      },
    });
    
    return { success: true, data: response.data.response.data };
  } catch (error) {
    return handleApiError(error, 'Art Community API');
  }
};
