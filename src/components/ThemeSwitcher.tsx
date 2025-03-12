import { useState } from 'react';
import { Select, MenuItem, Typography, Box, SelectChangeEvent } from '@mui/material';
import { t } from 'i18next';

interface ThemeSwitcherProps {
  onThemeChange: (themeKey: string) => void;
}

export default function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  // alapjaraton a localStoragebol vesszuk ki a temat - ha van

  const [selectedTheme, setSelectedTheme] = useState<string>(localStorage.getItem('selectedTheme') || 'mui');

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    // beallitjuk es elmentjuk localStorageba
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);
    localStorage.setItem('selectedTheme', newTheme);
    onThemeChange(newTheme);
  };

  // TODO: szoveg
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('navbarTheme')}
      </Typography>
      <Select value={selectedTheme} onChange={handleThemeChange} fullWidth>
        <MenuItem value="mui">MUI </MenuItem>
        <MenuItem value="forest">Forest </MenuItem>
        <MenuItem value="red">Red </MenuItem>
        <MenuItem value="blue">Ocean Blue </MenuItem>
        <MenuItem value="purple">Dark Purple </MenuItem>
      </Select>
    </Box>
  );
}
