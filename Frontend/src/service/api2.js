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
    return { success: true, data: response.data.response.data, message: "Welcome" };
  } catch (error) {
    return handleApiError(error, 'Google Login API');
  }
};

export const getTeamDetails = async (order_id, token) => {
  try {
    const response = await axios.get(`${URL}/api/admin/get-team-details`, {
      params:{order_id} ,
      headers: {
        "Authorization": token,
      },
      withCredentials: true,
    });
    
     return { success: true, data: response.data.response.data.attendee_data[0], message: "Welcome" };
  } catch (error) {
    return handleApiError(error, 'Google Login API');
  }
};

export const fetchAttendeeCount = async (token) => {
  try {
    const response = await axios.get(`${URL}/api/admin/count-attendee`, {
      headers: { "Authorization": token },
      withCredentials: true,
    });

    return { success: true, data: response.data.totalAttendees, message: response.data.message }

  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchAttendees = async (token) => {
  try {
    const response = await axios.get(`${URL}/api/admin/get-attendee`, {
      headers: { "Authorization": token },
      withCredentials: true,
    });
    
    return { success: true, data: response.data.response.data.attendee, message: response.data.response.message }
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateStatus = async (email, status, token) => {
  try {
    const response = await axios.post(`${URL}/api/admin/update-status`, {
      team_leader_email: email,
      team_status: status,
    }, {
      headers: { "Authorization": token },
      withCredentials: true,
    });    
    return { success: true, message: response.data.response.message };
  } catch (error) {
    return handleApiError(error);
  }
};
