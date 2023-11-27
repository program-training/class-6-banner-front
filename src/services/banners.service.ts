import axios from "axios";
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