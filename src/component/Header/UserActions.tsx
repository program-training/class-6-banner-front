import  { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const Navigate = useNavigate();

  const handleOpenMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = () => {
    handleCloseMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    Navigate('/');
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ color: 'inherit' }}>
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditProfile}>
          <Typography>Edit Profile</Typography>
        </MenuItem>
        {/* Add more menu items as needed */}
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;
