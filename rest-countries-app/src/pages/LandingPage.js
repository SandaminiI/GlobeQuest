// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Fade } from '@mui/material';
import backgroundImage from '../assets/Cover.jpg';
import Header from '../components/Header';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box
        sx={{
          height: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Dark overlay for contrast */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Fade in timeout={1000}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              color: '#fff',
              maxWidth: 700,
              px: 3,
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' } }}
            >
              GlobeQuest
            </Typography>

            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3rem' } }}
            >
              ...Explore the wolrd...
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.85)',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Discover countries across the world — from geography and population to languages and flags. Your journey to global knowledge starts here.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/home')}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: '30px',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Start Exploring
            </Button>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default LandingPage;
