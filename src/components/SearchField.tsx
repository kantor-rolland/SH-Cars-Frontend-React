import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, TextField } from '@mui/material';
import { t } from 'i18next';
import { ChangeEvent, useCallback } from 'react';

type Props = {
  query: string;
  text: string;
  setQuery: (newValue: string) => unknown;
};

export default function SearchField({ query, text, setQuery }: Props) {
  const onQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), [setQuery]);

  return (
    <FormControl sx={{ mx: 'auto', my: 5 }}>
      <Box sx={{ display: 'flex', width: '100%', backgroundColor: '#ffffff', borderRadius: 1 }}>
        <SearchIcon sx={{ mr: 1, my: 1 }} />
        <TextField
          size="small"
          variant="outlined"
          sx={{ minWidth: '320px', maxWidth: '500px', width: '100%', backgroundColor: '#ffffff', borderRadius: 1 }}
          label={t(text)}
          onChange={onQueryChange}
          value={query}
        />
      </Box>
    </FormControl>
  );
}
