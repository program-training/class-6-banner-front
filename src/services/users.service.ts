import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../component/interface/interface";

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


  export  const fetchUserById = async () => {
      try {
          const id = localStorage.getItem('userId');
          if (id) {
              const userId = JSON.parse(id);
              const response = await axios.get(`${api}/api/users/${userId}`)
              return response.data;
          }
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  }

export const handleUpdateUserData = async (userData:User) => {
    try {
        const id = localStorage.getItem('userId');
        if (id) {
            const userId = JSON.parse(id);
            const response = await axios.put(`${api}/api/users/update/${userId}`, {
                "username": userData.username,
                "email": userData.email,
                "password": userData.password,
                "isAdmin": userData.isAdmin
            })
            return response.data
            localStorage.setItem('username', JSON.stringify(userData.username))
        }
    } catch (error) {
        console.error('Error updating user details:', error);
    }
};

