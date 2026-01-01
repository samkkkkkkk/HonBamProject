import apiClient from '@/config/axiosConfig';
import { UPLOAD } from '@/config/host-config';
import axios from 'axios';

export const uploadApi = {
  getProfilePresigned: async (payload) => {
    const res = await apiClient.post(`${UPLOAD}/presigned/profile`, payload);
    return res.data;
  },

  putToS3: async ({ uploadUrl, file }) => {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },
};
