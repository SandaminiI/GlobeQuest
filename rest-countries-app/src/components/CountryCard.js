import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  IconButton,
  Tooltip
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const { user, favorites, toggleFavorite } = useAuth();
  const isFav = favorites.includes(country.cca3);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      // Not logged in → redirect to login
      navigate('/login');
    } else {
      toggleFavorite(country.cca3);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        width: 275,
        height: '100%',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/country/${country.cca3}`)} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={country.flags?.png}
          alt={`${country.name.common} flag`}
        />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              {country.name.common}
            </Typography>
            {user && (
  <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
    <IconButton onClick={handleFavoriteClick}>
      {isFav ? <Star color="warning" /> : <StarBorder />}
    </IconButton>
  </Tooltip>
)}

          </Box>
          <Typography variant="body2">
            Population: {country.population.toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Capital: {country.capital?.[0] || 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
