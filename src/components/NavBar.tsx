import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

interface NavBarProps {
  onThemeChange: (themeKey: string) => void;
}

export default function NavBar({ onThemeChange }: NavBarProps) {
  const { t } = useTranslation(); // nemzetkoziesiteshez

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '110px',
        }}
      >
        <ThemeSwitcher onThemeChange={onThemeChange} />

        <Box
          sx={{
            mx: 2,
            borderRight: '2px solid rgba(255, 255, 255, 0.7)',
            height: '30px',
            alignItems: 'left',
          }}
        >
          <Button color="inherit" component={Link} to="/">
            {t('navbarHome')}
          </Button>
          <Button color="inherit" component={Link} to="/cars">
            {t('navbarCars')}
          </Button>
          <Button color="inherit" component={Link} to="/create_car">
            {t('navbarAddCar')}
          </Button>
          <Button color="inherit" component={Link} to="/extras">
            {t('navbarExtras')}
          </Button>
          <Button color="inherit" component={Link} to="/create_extra">
            {t('navbarAddExtra')}
          </Button>
        </Box>

        <Box
          sx={{
            mx: 2,
            alignItems: 'flex-end',
          }}
        >
          <LanguageSwitcher />
        </Box>
        <Box
          sx={{
            mx: 2,
            borderRight: '2px solid rgba(255, 255, 255, 0.7)',
            height: '30px',
            alignItems: 'flex-end',
          }}
        >
          <Button color="inherit" component={Link} to="/login">
            {t('navbarLogin')}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
