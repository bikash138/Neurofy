import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1";

export const voiceNoteService = {
  getAllVoiceNotes: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/get-all-voice-notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getUploadUrl: async (token: string) => {
    const response = await axios.post(
      `${API_BASE_URL}/upload-voice-note`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  uploadToS3: async (preSignedUrl: string, file: Blob) => {
    await axios.put(preSignedUrl, file, {
      headers: {
        "Content-Type": "audio/webm",
      },
    });
  },

  createVoiceNote: async (
    token: string,
    data: { title: string; url: string; pinned: boolean }
  ) => {
    const response = await axios.post(
      `${API_BASE_URL}/create-voice-note`,
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
