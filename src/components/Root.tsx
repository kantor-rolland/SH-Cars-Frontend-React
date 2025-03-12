import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { t } from 'i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { queryClient } from '../query/common.query';
import NavBar from './NavBar';
import Footer from './Footer';
import Home from './Home';
import CarListPage from './car/CarListPage';
import CarDetailsPage from './car/CarDetailsPage';
import AddCarPage from './car/AddCarPage';
import EditCarPage from './car/EditCarPage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import { FOREST_THEME, DEEP_RED_THEME, OCEAN_BLUE_THEME, DARK_PURPLE_THEME } from '../theme/themes';
import ExtraListPage from './extra/ExtraListPage';
import EditExtraPage from './extra/EditExtraPage';
import ExtraDetailsPage from './extra/ExtraDetailsPage';
import AddExtraPage from './extra/AddExtraPage';

const themes = {
  forest: FOREST_THEME,
  red: DEEP_RED_THEME,
  blue: OCEAN_BLUE_THEME,
  purple: DARK_PURPLE_THEME,
};

export default function Root() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'mui';
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>(savedTheme);

  const currentTheme = themes[selectedThemeKey as keyof typeof themes];

  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedThemeKey); // frissitjuk a localStorage-ot
  }, [selectedThemeKey]);

  const theme = useMemo(() => createTheme(currentTheme), [currentTheme]);

  const handleThemeChange = (themeKey: string) => {
    setSelectedThemeKey(themeKey);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar onThemeChange={handleThemeChange} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />

              <Route path="/cars" element={<CarListPage />} />
              <Route path="/cars/:carId" element={<CarDetailsPage />} />
              <Route path="/create_car" element={<AddCarPage />} />
              <Route path="/modify_car/:carId" element={<EditCarPage />} />

              <Route path="/extras" element={<ExtraListPage />} />
              <Route path="/extras/:extraId" element={<ExtraDetailsPage />} />
              <Route path="/create_extra" element={<AddExtraPage />} />
              <Route path="/modify_extra/:extraId" element={<EditExtraPage />} />
              <Route path="*" element={<i>{t('cannotFindPage')}</i>} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
