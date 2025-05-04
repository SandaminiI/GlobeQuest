import React from 'react';
import backgroundImage from '../assets/About.png';
import {
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from '../components/Header';

const About = () => {
  return (
    <>
    <Header/>
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
            position: 'relative',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            textAlign: 'center',
            py: { xs: 10, md: 15 },
            px: 2,
        }}
       >
        {/* Dark overlay */}
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1,
            }}
        />

     {/* Content above the overlay */}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                About GlobeQuest
           </Typography>
            <Typography variant="h6">
                Discover the world from your screen. Learn, explore, and favorite countries across the globe.
         </Typography>
        </Container>
        </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6 }}>
       
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Who We Are
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" >
            <strong>GlobeQuest</strong> is a modern web platform that lets you explore detailed information about countries around the world. From geography and culture to languages and regions, everything is at your fingertips.
          </Typography>
          <Typography variant="body1">
            Our mission is to provide an interactive, engaging experience for users of all backgrounds – whether you're a geography nerd, a frequent traveler, or just curious.
          </Typography>

          {/* Features */}
          <Box mt={5}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Why Choose GlobeQuest?
            </Typography>
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <PublicIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="medium">
                    Global Coverage
                  </Typography>
                  <Typography variant="body2">
                    Access information on countries from every region of the world.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <ExploreIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="medium">
                    Powerful Search & Filters
                  </Typography>
                  <Typography variant="body2">
                    Find countries by name, region, or language with ease.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box textAlign="center">
                  <FavoriteIcon sx={{ fontSize: 50, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="medium">
                    Favorites System
                  </Typography>
                  <Typography variant="body2">
                    Logged-in users can save and view their favorite countries.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* CTA */}
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" gutterBottom>
              Ready to start exploring?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/home"
              size="large"
            >
              Explore Now
            </Button>
          </Box>
      </Container>
    </Box>
    </>
  );
};

export default About;
