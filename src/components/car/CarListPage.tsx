import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, Container, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchField from '../SearchField';
import useFindCarsByQuery from '../../hooks/car/useFindCarsByQuery';

function CarListPage() {
  const [query, setQuery] = useState('');

  const { t } = useTranslation(); // nemzetkoziesiteshez

  // sajat hook
  const { data, isLoading } = useFindCarsByQuery(query);

  // le kell kezelni a data-t, mert anelkul nem lehet megadni a mapnek
  if (!data || data.length === 0) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {t('carListPageMessage')}
        </Typography>
        <Container maxWidth="md">
          <SearchField query={query} text="searchFieldTextCar" setQuery={setQuery} />
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 2 }}>
            {t('noCarsMessage')}
          </Typography>
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('carListPageMessage')}
      </Typography>
      <Container maxWidth="md">
        <SearchField query={query} text="searchFieldTextCar" setQuery={setQuery} />

        {data.map((car) => (
          <Card
            key={car.id}
            sx={{
              marginBottom: 2,
              padding: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ paddingBottom: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {car.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {car.brand} ({car.year})
              </Typography>
              <Typography variant="body2" color="primary">
                ${car.price}
              </Typography>
            </CardContent>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to={`/cars/${car.id}`} variant="contained" color="primary" size="small">
                {t('buttonDetails')}
              </Button>
            </Box>
            <Box sx={{ padding: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to={`/modify_car/${car.id}`} variant="contained" color="primary" size="small">
                {t('buttonEdit')}
              </Button>
            </Box>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default CarListPage;
