import { useState } from 'react';
import i18n from 'i18next';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Flag from 'react-world-flags';

export default function LanguageSwitcher() {
  // ha megjelenitsuk magat a nyelvet is felhasznalobaratabb
  const [values] = useState([
    { code: 'en', label: 'English', flag: 'US' }, // vagy GB
    { code: 'hu', label: 'Magyar', flag: 'HU' },
    { code: 'ro', label: 'Română', flag: 'RO' },
  ]);
  const [selected, setSelected] = useState(i18n.language);

  // a nyelvet localStorage mentjuk selectedLanguage neven
  const changeLanguage = (lang: string) => {
    // beallitjuk localStorageba
    i18n.changeLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    setSelected(lang);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;
    console.log('Language changed!!!');
    changeLanguage(newLanguage);
  };

  return (
    <Select value={selected} onChange={handleChange}>
      {values.map((item) => (
        <MenuItem key={item.code} value={item.code}>
          {item.label}
          <Flag code={item.flag} style={{ width: 20, height: 20, marginLeft: 8 }} />
        </MenuItem>
      ))}
    </Select>
  );
}
