import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import i18n from '../../../i18n';

interface CarFieldsProps {
  car: {
    name: string;
    brand: string;
    year: number;
    price: number;
    id: number;
    uploadDate: string | Date;

    // az uj mezok
    mileage: number;
    cubicCapacity: number;
    carPower: number;
    fuelType: string;
    transmission: string;
  };
}

function CarFields({ car }: CarFieldsProps) {
  const currentLanguage = i18n.language;
  const [stringForDate, setStringForDate] = useState<string>('en-EN'); // szukseges ahhoz hogy a datumformatumot nyelvekhez kepest formataljuk

  useEffect(() => {
    const formattedStr = `${currentLanguage.toLowerCase()}-${currentLanguage.toUpperCase()}`;
    setStringForDate(formattedStr);
  }, [currentLanguage]);

  // adott regio - nyelv szerint formataljuk a datumot
  const formattedUploadDate = new Intl.DateTimeFormat(stringForDate, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(car.uploadDate));

  return (
    <>
      <Typography variant="h6">
        <strong>{t('model')}:</strong> {car.name}
      </Typography>
      <Typography variant="h6">
        <strong>{t('brand')}:</strong> {car.brand}
      </Typography>
      <Typography variant="h6">
        <strong>{t('year')}:</strong> {car.year}
      </Typography>
      <Typography variant="h6">
        <strong>{t('price')}:</strong> ${car.price}
      </Typography>
      <Typography variant="h6">
        <strong>{t('carId')}:</strong> {car.id}
      </Typography>
      <Typography variant="h6">
        <strong>{t('uploadDate')}:</strong> {formattedUploadDate}
      </Typography>
      <Typography variant="h6">
        <strong>{t('mileage')}:</strong> {car.mileage}
      </Typography>
      <Typography variant="h6">
        <strong>{t('cubicCapacity')}:</strong> {car.cubicCapacity}
      </Typography>
      <Typography variant="h6">
        <strong>{t('carPower')}:</strong> {car.carPower}
      </Typography>
      <Typography variant="h6">
        <strong>{t('fuelType')}:</strong> {t(car.fuelType)}
      </Typography>
      <Typography variant="h6">
        <strong>{t('transmission')}:</strong> {t(car.transmission)}
      </Typography>
    </>
  );
}

export default CarFields;
