import './App.css';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import FavoritesPage from './pages/FavoritesPage';
import About from './pages/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
