import axios, { AxiosRequestConfig } from "axios";
import { EditRequestData, AddRequestData } from "../component/interface/interface";
const api = import.meta.env.VITE_MY_SERVER;

export const deleteBanner = async (id: string) => {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${api}/banners/${id}`, options);
    if (response)
      return response

  } catch (error) {
    console.error("Error deleting banner:", error);
  }
};

export const addBanner = async (requestData: AddRequestData, options: AxiosRequestConfig<AddRequestData>) => {
  try {
    const response = await axios.post(`${api}/banners`, requestData, options);
    return response;
  } catch (error) {
    console.error('Error adding banner:', error);
    throw error;
  }
};

export const uploadImageToCloudinary = async (imageFile: File) => {
  const preset_key = "ughivthg";
  const cloudName = "dm7dutcrn";
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', preset_key);
  try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      return response.data.url;
  } catch (error) {
      console.error('Error uploading the image: ', error);
  }
};

export const updateBanner = async (id: string | undefined, requestData: EditRequestData, options: AxiosRequestConfig<EditRequestData>) => {
  try {
    const response = await axios.put(`${api}/banners/${id}`, requestData, options);
    return response;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};

