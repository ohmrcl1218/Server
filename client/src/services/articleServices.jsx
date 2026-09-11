import axios from "axios";

const endpoint = "http://localhost:5000/articles";

// Get All Articles
export const getArticles = async () => {
  try {
    const response = await axios.get(`${endpoint}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

