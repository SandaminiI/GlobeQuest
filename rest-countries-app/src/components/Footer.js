import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#1976d2', color: '#fff', py: 1, mt: 6 }}>
      <Container maxWidth="lg">
        {/* Copyright */}
        <Typography variant="body2" textAlign="center" mt={3}>
          © {new Date().getFullYear()} GlobeTrekker. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
