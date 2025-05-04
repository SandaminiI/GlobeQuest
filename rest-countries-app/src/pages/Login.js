import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box, Button, TextField, Typography, Paper
} from '@mui/material';
import Header from '../components/Header';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <>
      <Header />
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Paper elevation={3} sx={{ p: 4, width: 380 }}>
        <Box textAlign="center" width="100%" mb={2}>
          <Typography variant="h5"><strong>Login</strong></Typography>
        </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>Log In</Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
