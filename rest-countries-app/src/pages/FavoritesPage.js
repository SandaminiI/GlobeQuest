import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import CountryCard from '../components/CountryCard';
import { getAllCountries } from '../services/countryService';
import Header from '../components/Header';

const FavoritesPage = () => {
  const { favorites, user } = useAuth();
  const [favCountries, setFavCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getAllCountries();
        const matched = res.data.filter((country) =>
          favorites.includes(country.cca3)
        );
        setFavCountries(matched);
      } catch (error) {
        console.error('Failed to load countries:', error);
      }
    };

    if (user) {
      fetchCountries();
    }
  }, [favorites, user]);

  return (
    <>
      <Header />
      <Box p={4}>
        <Box textAlign="center" mt={1} mb={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Your Favorite Countries
          </Typography>

          {user && favCountries.length > 0 && (
            <Box
              sx={{
                display: 'inline-block',
                backgroundColor: '#333',
                color: '#fff',
                px: 3,
                py: 1,
                borderRadius: '12px',
                boxShadow: 3,
                mt: 1,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Total Countries: {favCountries.length}
              </Typography>
            </Box>
          )}
        </Box><br/>

        {!user ? (
          <Typography variant="body1" color="textSecondary">
            Please log in to view your favorite countries.
          </Typography>
        ) : favCountries.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            You haven't added any favorites yet.
          </Typography>
        ) : (
          <Grid container spacing={7}>
            {favCountries.map((country) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                <CountryCard country={country} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default FavoritesPage;
