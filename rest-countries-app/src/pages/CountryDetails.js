import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getByCode, getAllCountries } from '../services/countryService';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
  Link,
  Divider,
  Paper,
  Button
} from '@mui/material';
import Header from '../components/Header';

const CountryDetails = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countryRes, allRes] = await Promise.all([
          getByCode(code),
          getAllCountries()
        ]);
        setCountry(countryRes.data[0]);
        setAllCountries(allRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch country details', error);
      }
    };

    fetchData();
  }, [code]);

  const getValue = (label, value) => (
    <Box mb={2}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || 'N/A'}</Typography>
    </Box>
  );

  const getBorderCountries = () => {
    if (!country.borders || !allCountries.length) return [];
    return allCountries
      .filter((c) => country.borders.includes(c.cca3))
      .map((c) => ({
        name: c.name.common,
        code: c.cca3,
        flag: c.flags?.png
      }));
  };

  if (loading || !country) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Header/>
    <Box maxWidth="1000px" mx="auto" mt={4} px={2}>
      {/* Country Name */}
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        {country.name.common}
      </Typography>

      {/* Flag */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardMedia
            component="img"
            image={country.flags?.png}
            alt={`${country.name.common} flag`}
            sx={{ height: 250, objectFit: 'cover' }}
          />
        </Card>
      </Box>

      {/* Information Section */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={50}>
          <Grid item xs={12} md={6}>
            {getValue(
              'Native Name',
              country.name.nativeName
                ? Object.values(country.name.nativeName)[0].common
                : 'N/A'
            )}
            {getValue('Capital', country.capital?.[0])}
            {getValue('Region', country.region)}
            {getValue('Subregion', country.subregion)}
            {getValue(
              'Population',
              country.population.toLocaleString()
            )}
            {getValue('Area', `${country.area.toLocaleString()} km²`)}
          </Grid>

          <Grid item xs={12} md={6}>
            {getValue('Languages', country.languages
              ? Object.values(country.languages).join(', ')
              : 'N/A'
            )}
            {getValue('Timezones', country.timezones?.join(', '))}
            {getValue('Currencies', country.currencies
              ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')
              : 'N/A'
            )}
            {getValue('Top Level Domains', country.tld?.join(', '))}
            {getValue('Driving Side', country.car?.side)}
            {getValue('Independence', country.independent ? 'Yes' : 'No')}
          </Grid>
        </Grid>


        {/* Bordering Countries */}
        {country.borders && country.borders.length > 0 && (
          <Box mt={4}>
            <Typography variant="body1" gutterBottom>
              <strong>Bordering Countries:</strong>
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {getBorderCountries().map((b) => (
                <Button
                  key={b.code}
                  component={RouterLink}
                  to={`/country/${b.code}`}
                  variant="outlined"
                  size="small"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textTransform: 'none',
                    padding: '6px 12px'
                  }}
                >
                  <img
                    src={b.flag}
                    alt={`${b.name} flag`}
                    style={{ width: 24, height: 16, objectFit: 'cover' }}
                  />
                  {b.name}
                </Button>
              ))}
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Google Maps */}
        <Typography variant="body1">
          <strong>Google Maps:</strong>{' '}
          <Link
            href={country.maps?.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            View on Google Maps
          </Link>
        </Typography>
      </Paper>
      <br /><br />
    </Box>
    </>
  );
};

export default CountryDetails;
