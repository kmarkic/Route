import axios from 'axios';

const API_URL = 'https://tvojapi.com/search';

export const searchItems = async (query) => {
  try {
    const response = await axios.get(`${API_URL}?q=${query}`);
    return response.data; // podaci koje vraća API
  } catch (error) {
    console.error(error);
    return [];
  }
};
