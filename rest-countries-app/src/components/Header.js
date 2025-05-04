import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.PNG';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();         
    navigate('/'); 
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo + App Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <Avatar
  src={logo}
  alt="Logo"
  sx={{ width: 32, height: 32, mr: 1 }}
/>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            GlobeQuest
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ mx: 1 }}>
            Home
          </Button>
          <Button color="inherit" startIcon={<PublicIcon />} onClick={() => navigate('/home')} sx={{ mx: 1 }}>
            Countries
          </Button>
          <Button color="inherit" startIcon={<InfoIcon />} onClick={() => navigate('/about')} sx={{ mx: 1 }}>
            About
          </Button>

          {user ? (
            <>
              <Button color="inherit" startIcon={<FavoriteIcon />} onClick={() => navigate('/favorites')} sx={{ mx: 1 }}>
                Favorites
              </Button>
              <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout} >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" startIcon={<LoginIcon />} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
