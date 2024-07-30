import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";
const UPLOAD_URL = "https://crafto.app/crafto/v1.0/media/assignment/upload";

export const login = (username, otp) => {
  return axios.post(`${API_BASE_URL}/login`, { username, otp });
};

export const getQuotes = (token, limit, offset) => {
  return axios.get(`${API_BASE_URL}/getQuotes`, {
    params: { limit, offset },
    headers: { Authorization: token },
  });
};

export const uploadMedia = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(UPLOAD_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createQuote = (token, text, mediaUrl) => {
  return axios.post(
    `${API_BASE_URL}/postQuote`,
    { text, mediaUrl },
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
};
