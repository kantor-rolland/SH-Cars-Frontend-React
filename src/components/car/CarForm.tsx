import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CarInDTO } from '../../model/dto/car/carInDTO';

interface CarFormProps {
  initialData?: CarInDTO | null;
  onSubmit: (data: CarInDTO) => void;
}

function CarForm({ initialData = null, onSubmit }: CarFormProps) {
  const { t } = useTranslation(); // nemzetkoziesiteshez

  const [formData, setFormData] = useState<CarInDTO>({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    cubicCapacity: initialData?.cubicCapacity || 0,
    carPower: initialData?.carPower || 0,
    fuelType: initialData?.fuelType || '',
    transmission: initialData?.transmission || '',
  });

  // adatok frissitese
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      console.log({ initialData });
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // TODO: az uj entitasok
    setFormData({
      ...formData,
      [name]: name === 'year' || name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      brand: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      cubicCapacity: 0,
      carPower: 0,
      fuelType: '',
      transmission: '',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {initialData ? t('editCarMessage') : t('addCarMessage')}
      </Typography>

      <TextField
        // label="Name"
        label={t('model')}
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label={t('brand')}
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label={t('year')}
        name="year"
        type="number"
        value={formData.year}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        label={t('price')}
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {initialData ? t('buttonSaveChanges') : t('buttonAddCar')}
      </Button>
    </Box>
  );
}

export default CarForm;
