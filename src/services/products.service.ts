import axios from "axios";
const store = import.meta.env.VITE_STORE_SERVER;

export const fetchProducts = async () => {
    try {
      const response = await axios.get(`${store}/api/products`);
      return response.data
    } catch (error) {
      console.error(error);
    }
  };