import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1";

export const noteService = {
  getAllNotes: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/get-all-note`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getNote: async (noteId: string, token: string) => {
    const response = await axios.get(`${API_BASE_URL}/get-note/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createNote: async (token: string, title: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/create-note`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  togglePin: async (token: string, noteId: number, pinned: boolean) => {
    const response = await axios.put(
      `${API_BASE_URL}/mark-as-pinned`,
      { noteId, pinned },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  deleteNote: async (token: string, noteId: number) => {
    const response = await axios.delete(`${API_BASE_URL}/delete-note`, {
      data: { noteId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  updateNote: async (
    token: string,
    noteId: string,
    data: { title: string; content: any }
  ) => {
    const response = await axios.put(
      `${API_BASE_URL}/update-note/${noteId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
