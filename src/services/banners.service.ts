import axios, { AxiosRequestConfig } from "axios";
import { EditRequestData, AddRequestData } from "../component/interface/interface";
const api = import.meta.env.VITE_MY_SERVER;

export async function fetchBanners() {
  try {
    const response = await axios.get(`${api}/api/banners`);
    return response.data
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
}


export const deleteBanner = async (id: string) => {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(`${api}/api/banners/${id}`, options);
    if (response)
      return response

  } catch (error) {
    console.error("Error deleting banner:", error);
  }
};

export const addBanner = async (requestData: AddRequestData, options: AxiosRequestConfig<AddRequestData>) => {
  try {
    const response = await axios.post(`${api}/api/banners`, requestData, options);
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
    const response = await axios.put(`${api}/api/banners/${id}`, requestData, options);
    return response;
  } catch (error) {
    console.error('Error updating banner:', error);
    throw error;
  }
};

    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };


 export const fetchBannerById = async (id:string) => {
    try {
      const response = await axios.get(`${api}/api/banners/${id}`);
      return response.data
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

