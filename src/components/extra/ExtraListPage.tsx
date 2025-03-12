import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Container, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useFindExtrasByQuery from '../../hooks/extra/useFindExtrasByQuery';
import SearchField from '../SearchField';

export default function ExtraListPage() {
  const { t } = useTranslation(); // nemzetkoziesiteshez
  const [query, setQuery] = useState('');

  const { data, isLoading } = useFindExtrasByQuery(query);

  // le kell kezelni a data-t, mert anelkul nem lehet megadni a mapnek

  // TODO: szoveg
  if (!data || data.length === 0) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('extraListPageMessage')}
        </Typography>
        <Container maxWidth="md">
          <SearchField query={query} text="searchFieldTextExtra" setQuery={setQuery} />
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
            {t('noExtrasMessage')}
          </Typography>
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  // TODO: a searchfieldnek megadni parameternek a stringet
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('extraListPageMessage')}
      </Typography>
      <Container maxWidth="md">
        <SearchField query={query} text="searchFieldTextExtra" setQuery={setQuery} />

        {data.map((extra) => (
          <Card
            key={extra.id}
            sx={{
              marginBottom: 2,
              padding: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {t('extraName')} : {extra.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {t('extraID')} : {extra.id}
              </Typography>
            </CardContent>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to={`/extras/${extra.id}`} variant="contained" color="primary" size="small">
                {t('buttonDetails')}
              </Button>
            </Box>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                component={Link}
                to={`/modify_extra/${extra.id}`}
                variant="contained"
                color="primary"
                size="small"
              >
                {t('buttonEdit')}
              </Button>
            </Box>
          </Card>
        ))}
      </Container>
    </Box>
  );
}
