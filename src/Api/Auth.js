import axios from 'axios';

const API_URL = 'http://192.168.1.10:8000/api/Auth';
const LAWYER_URL = 'http://192.168.1.10:8000/api/lawyers';
const CASE_API_URL = 'http://192.168.1.10:8000/api/cases';
export const signup = async (formData) => {
  try {
    console.log('Attempting to sign up with formData:', formData);
    const response = await axios.post(`${API_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Signup error response:', error.response.data);
    } else if (error.request) {
      console.error('Signup error request:', error.request);
    } else {
      console.error('Signup error message:', error.message);
    }
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const getLawyerProfileStatus = async (email) => {
  try {

    console.log("email:", email);
    const response = await axios.get(`${LAWYER_URL}/profile/status`, {
      params: { email: email }
    }); // Adjust API endpoint as per your backend setup
    console.log("sssss:",response)
    return response.data; // Assuming backend returns { profileExists: true/false }
  } catch (error) {
    console.error('Error fetching profile status:', error);
    throw error;
  }
};
// New function for creating message
export const createMessage = async (consultationId, senderId, text) => {
  try {
    const response = await axios.post(`${API_URL}/messages/create`, { consultationId, senderId, text });
    console.log('Response from create message request:', response.data);
    return response.data; // Adjust as per your API response structure
  } catch (error) {
    handleAxiosError(error, 'create message');
    throw error;
  }
};
export const createCase = async (caseData) => {
  try {
    const response = await axios.post(CASE_API_URL, caseData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'create case'); // Log and handle Axios errors
    throw error; // Rethrow the error to propagate it upwards
  }
};

export const fetchCases = async () => {
  try {
    const response = await axios.get(CASE_API_URL);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'fetch cases');
    throw error;
  }
};

export const deleteCase = async (caseId) => {
  try {
    const response = await axios.delete(`${CASE_API_URL}/${caseId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'delete case');
    throw error;
  }
};
export const updateCase = async (caseData) => {
  try {
    const response = await axios.put(`${BASE_URL}/cases/${caseData._id}`, caseData, {
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers as needed (e.g., authorization token)
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to update case');
    }

    return response.data; // Assuming your API returns the updated case object
  } catch (error) {
    throw error;
  }
};

// Error handling function (optional, to avoid duplication)
const handleAxiosError = (error, requestType) => {
  if (error.response) {
    console.error(`${requestType} error response:`, error.response.data);
  } else if (error.request) {
    console.error(`${requestType} error request:`, error.request);
  } else {
    console.error(`${requestType} error message:`, error.message);
  }
};