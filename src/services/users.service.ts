import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_MY_SERVER;


export const deleteAccount = async () => {
  const Navigate = useNavigate();
    const id = localStorage.getItem('userId')
    if (!id) {
        return
    }
    const userId = JSON.parse(id)

    try {
      const response = await axios.delete(`${api}/api/users/delete/${userId}`);
      if (response) {
        window.alert('User successfully deleted')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        Navigate('/')
      }
    } catch (error:unknown) {
      if (error instanceof AxiosError) {
      window.alert(error.response?.data.message)}}
      
    };
