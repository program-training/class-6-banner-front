import { useState } from 'react';

import { Box, IconButton, Menu, MenuItem, Popover, Typography, useTheme } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditUser from '../../pages/EditUser/EditUser';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
const api = import.meta.env.VITE_MY_SERVER;

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null| HTMLElement>(null);
  const theme = useTheme();
  const Navigate = useNavigate();
  const id = localStorage.getItem('userId')
  let userId: string
  if (id) {

    userId = JSON.parse(id)
  }

  const [editUserOpen, setEditUserOpen] = useState(false);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };


  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event:React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleEditProfile = () => {
    setEditUserOpen(true);
    handleCloseMenu();
  };

  const handleDeleteAccount = async () => {
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
      finally{ handleCloseMenu()}
    };

  const handleLogout = () => {
    localStorage.removeItem('username');
    Navigate('/');
  };

  const handleCloseEditUser = () => {
    setEditUserOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ color: 'inherit' }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditProfile}>
          <EditIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Edit Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount}>
          <DeleteIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Delete Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
      <Popover
        open={editUserOpen}
        anchorEl={anchorEl}
        onClose={handleCloseEditUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <EditUser />
        </Box>
      </Popover>
    </>
  );
};

export default UserProfile
