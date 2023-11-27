import { useState, useEffect } from 'react';
import {Button,TextField,Dialog,DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import axios from 'axios';
import { boolean } from 'yup';
const api = import.meta.env.VITE_MY_SERVER

const EditUser = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [userData, setUserData] = useState({
        _id: '',
        username: '',
        email: '',
        password: '',
        isAdmin: boolean,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const id = localStorage.getItem('userId');
                if (id) {
                    const userId = JSON.parse(id);
                    console.log(userId);
                    const response = await axios.get(`${api}/api/users/${userId}`)
                    setUserData(response.data.user);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }
        fetchUserData();
    }, []);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSaveUserData = async () => {
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
                console.log('User details updated:', response.data);
                handleCloseDialog();
                localStorage.setItem('username', JSON.stringify(userData.username))
            }
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Edit Your Details</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginBottom: "15px", marginTop: "15px"}}
                        label="User name"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField sx={{marginBottom: "15px"}}
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField sx={{marginBottom: "15px"}}
                        type="password"
                        label="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUserData} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default EditUser;
