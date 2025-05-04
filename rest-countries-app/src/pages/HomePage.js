import React, { useEffect, useState } from 'react';
import {
  getAllCountries,
  searchByName
} from '../services/countryService';
import CountryCard from '../components/CountryCard';
import { useAuth } from '../context/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  InputBase,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const navigate = useNavigate();

  const { user, favorites } = useAuth();
  const { mode, toggleTheme } = useThemeContext();

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const fetchCountries = async () => {
    try {
      const res = await getAllCountries();
      setCountries(res.data);
      setAllCountries(res.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      applyFilters(selectedRegion, languageFilter);
    } else {
      try {
        const res = await searchByName(term);
        setCountries(res.data);
      } catch {
        setCountries([]);
      }
    }
  };

  const applyFilters = (region, language) => {
    let filtered = [...allCountries];

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    if (language) {
      filtered = filtered.filter(
        (country) =>
          country.languages &&
          Object.values(country.languages).some((lang) =>
            lang.toLowerCase().includes(language.toLowerCase())
          )
      );
    }

    setCountries(filtered);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    applyFilters(region, languageFilter);
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setLanguageFilter(language);
    applyFilters(selectedRegion, language);
  };

  const filteredCountries = showFavoritesOnly
    ? countries.filter((c) => favorites.includes(c.cca3))
    : countries;

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <Header />
      <Box p={4}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Explore Countries
          </Typography>
        </Box>

        {/* Search + Filters + Theme + Total */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          gap={2}
          mb={4}
          flexWrap="wrap"
        >
          {/* Custom Search Bar */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchTerm);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 350,
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid #2196f3',
              backgroundColor: '#fff',
            }}
          >
            <InputBase
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: 1,
                pl: 2,
                py: 1,
              }}
            />
            <IconButton
              type="submit"
              sx={{
                backgroundColor: '#2196f3',
                color: 'white',
                borderRadius: 0,
                px: 2,
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Region Filter Styled */}
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 250,
              borderRadius: '10px',
              px: 2,
              py: 1,
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              border: '1px solid #2196f3',
              backgroundColor: '#fff',
            }}
          >
            <Select
              value={selectedRegion}
              onChange={handleRegionChange}
              displayEmpty
              fullWidth
              variant="standard"
              disableUnderline
              sx={{
                flex: 1,
                fontSize: '0.95rem',
              }}
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </Paper>

          {/* Language Filter Styled */}
          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 250,
              borderRadius: '10px',
              px: 2,
              py: 1,
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              border: '1px solid #2196f3',
              backgroundColor: '#fff',
            }}
          >
            <InputBase
              placeholder="Language"
              value={languageFilter}
              onChange={handleLanguageChange}
              sx={{
                flex: 1,
                fontSize: '0.95rem',
              }}
            />
          </Paper>

          {/* Theme Toggle and Total */}
          <Box display="flex" alignItems="center" gap={2} sx={{ ml: { md: 'auto' } }}>
            <Paper
              elevation={3}
              sx={{
                px: 3,
                py: 1,
                backgroundColor: mode === 'dark' ? '#555' : '#333',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              Total Countries: {filteredCountries.length}
            </Paper>
            <Tooltip title="Toggle theme">
              <IconButton onClick={toggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Countries Grid */}
        <Grid container spacing={7}>
          {filteredCountries.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" align="center" sx={{ mt: 4 }}>
                No countries found.
              </Typography>
            </Grid>
          ) : (
            filteredCountries.map((country) => (
              <Grid item xs={12} sm={6} md={3} key={country.cca3} display="flex">
                <Box sx={{ minHeight: 200, display: 'flex', width: '100%' }}>
                  <CountryCard country={country} />
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
