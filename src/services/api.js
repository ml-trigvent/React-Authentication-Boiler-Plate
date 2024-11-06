import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Adjust this to your API base URL

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData, {
    withCredentials: false,
  });
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${API_URL}/login`, payload);
  return response.data;
};
export const SentOtp = async (payload) => {
  const response = await axios.post(`${API_URL}/forget/password`, payload);
  return response.data;
};
 export const OtpVerificationNumber = async (payload) => {
  const response = await axios.post(`${API_URL}/password/otp/check`,payload);
  return response.data
 } 

 export const SetNewPassword = async (payload) =>{
  const response = await axios.post(`${API_URL}/reset/password`, payload);
  return response.data
 }