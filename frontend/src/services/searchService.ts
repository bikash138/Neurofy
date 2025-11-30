import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1";
const SEMANTIC_SEARCH_URL = "http://localhost:8000";

export const searchService = {
  searchNotes: async (token: string, searchQuery: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/search`,
      { searchQuery },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  semanticSearch: async (query: string) => {
    const response = await axios.post(`${SEMANTIC_SEARCH_URL}/search`, {
      query,
    });
    return response.data;
  },
};
