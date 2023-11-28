import { useState, useEffect } from 'react';
import {Button,TextField,Dialog,DialogTitle,DialogContent,DialogActions,} from '@mui/material';
import { fetchUserById, handleUpdateUserData } from '../../../services/users.service';

const EditUser = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [userData, setUserData] = useState({
        _id: '',
        username: '',
        email: '',
        password: '',
        isAdmin:true,
    });

    async function getUser() {
        const data = await fetchUserById();
        if (data) setUserData(data);
      }
    
    useEffect(() => {
        getUser();
    }, []);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSaveUserData = async () => {
        try {
           const response = await handleUpdateUserData(userData)
           if( response)
           handleCloseDialog()
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
