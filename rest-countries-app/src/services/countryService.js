import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  return axios.get(`${BASE_URL}/all`);
};

export const searchByName = async (name) => {
  return axios.get(`${BASE_URL}/name/${name}`);
};

export const filterByRegion = async (region) => {
  return axios.get(`${BASE_URL}/region/${region}`);
};

export const getByCode = async (code) => {
  return axios.get(`${BASE_URL}/alpha/${code}`);
};
