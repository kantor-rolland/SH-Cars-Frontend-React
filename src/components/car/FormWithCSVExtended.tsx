import { useState } from 'react';
import { CircularProgress, SelectChangeEvent, TextField, Typography, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCarDataExtended, addCarSchemaExtended } from '../../formValidation/validationSchemas';
import { FuelType } from '../../util/enums/FueltTypeEnum';
import { Transmission } from '../../util/enums/TransmissionEnum';
import { CarData, CarFormProps, FieldName } from '../../util/Types';
import LoadDataFromCSV from './carFormComponentsExtended/LoadDataFromCSV';
import SelectController from './carFormComponentsExtended/SelectController';
import { formStyles } from '../../util/Styles';
import { createSlotProps } from './carFormComponentsExtended/createSlotProps';

export default function FormWithCSVExtended({ initialData = null, onSubmit }: CarFormProps) {
  const [csvData, setCsvData] = useState<CarData[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('');
  const [text, setText] = useState<string>('');
  const { t } = useTranslation(); // nemzetkoziesiteshez

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddCarDataExtended>({
    resolver: zodResolver(addCarSchemaExtended),
    defaultValues: {
      name: initialData?.name || '',
      brand: initialData?.brand || '',
      year: initialData?.year || new Date().getFullYear(),
      price: initialData?.price || 0,
      mileage: initialData?.mileage || 0,
      cubicCapacity: initialData?.cubicCapacity || 0,
      carPower: initialData?.carPower || 0,
      fuelType: initialData?.fuelType || '',
      transmission: initialData?.transmission || '',
    },
  });

  // TextField tomorebb meghivasahoz
  const createTextFieldProps = (
    label: string,
    name: FieldName,
    min?: number,
    max?: number,
    step?: number,
    margin: 'normal' | 'dense' | 'none' = 'normal',
  ) => {
    const slotProps = createSlotProps(min || 0, max || 10000000, step || 10000);
    return {
      label: t(label),
      type: 'number',
      slotProps,
      fullWidth: true,
      required: true,
      margin,
      ...control.register(name, { valueAsNumber: true }),
    };
  };

  const handleDataLoaded = (data: CarData[], brandList: string[], modelsByBrand: Record<string, string[]>) => {
    setCsvData(data);
    setBrands(brandList);
    setModels(modelsByBrand[selectedBrand] || []);
    setLoading(false);
  };

  LoadDataFromCSV({
    onDataLoaded: handleDataLoaded,
    setLoading,
    setText,
    initialData,
    setSelectedBrand,
    setSelectedModel,
    setSelectedFuel,
    setSelectedTransmission,
  });

  const handleChangeBrand = (event: SelectChangeEvent<string>) => {
    const brand = event.target.value;
    setSelectedBrand(brand);

    const availableModels = csvData.filter((item) => item.make === brand).map((item) => item.model);
    setModels(availableModels);
    setSelectedModel('');
    setValue('brand', brand);
    setValue('name', '');
  };

  const handleChangeModel = (event: SelectChangeEvent<string>) => {
    const model = event.target.value;
    setSelectedModel(model);
    setValue('name', model);
  };

  const handleChangeFuel = (event: SelectChangeEvent<string>) => {
    const fuelType = event.target.value;
    setSelectedFuel(fuelType);
    setValue('fuelType', fuelType);
  };

  const handleChangeTransmission = (event: SelectChangeEvent<string>) => {
    const transmission = event.target.value;
    setSelectedTransmission(transmission);
    setValue('transmission', transmission);
  };

  if (loading) {
    return <CircularProgress />;
  }

  const handleFormSubmit = (data: AddCarDataExtended) => {
    onSubmit(data);
    if (initialData) {
      console.log(t('editCarMessageSuccessfully'));
    } else {
      console.log(t('addCarMessageSuccessfully'));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={formStyles}>
      <Typography variant="h6" align="center" gutterBottom>
        {t(text)}
      </Typography>

      <SelectController
        name="brand"
        control={control}
        label={t('brand')}
        value={selectedBrand}
        onChange={handleChangeBrand}
        options={brands}
        error={errors.brand?.message}
      />

      {/* todo: name vagy model */}
      <SelectController
        name="name"
        control={control}
        label={t('model')}
        value={selectedModel}
        onChange={handleChangeModel}
        options={models}
        error={errors.name?.message}
      />

      <TextField {...createTextFieldProps('year', 'year', 1900, new Date().getFullYear(), 1, 'normal')} />
      {errors.year && <Typography color="error">{errors.year.message}</Typography>}

      <TextField {...createTextFieldProps('price', 'price', 0, undefined, 100, 'normal')} />
      {errors.price && <Typography color="error">{errors.price.message}</Typography>}

      <TextField {...createTextFieldProps('mileage', 'mileage', 0, 1000000, 100, 'normal')} />
      {errors.mileage && <Typography color="error">{errors.mileage.message}</Typography>}

      <TextField {...createTextFieldProps('cubicCapacity', 'cubicCapacity', 0, undefined, 100, 'normal')} />
      {errors.cubicCapacity && <Typography color="error">{errors.cubicCapacity.message}</Typography>}

      <TextField {...createTextFieldProps('carPower', 'carPower', 0, undefined, 100, 'normal')} />
      {errors.carPower && <Typography color="error">{errors.carPower.message}</Typography>}

      <SelectController
        name="fuelType"
        control={control}
        label={t('fuelType')}
        value={selectedFuel}
        onChange={handleChangeFuel}
        options={Object.values(FuelType)}
        error={errors.fuelType?.message}
      />

      <SelectController
        name="transmission"
        control={control}
        label={t('transmission')}
        value={selectedTransmission}
        onChange={handleChangeTransmission}
        options={Object.values(Transmission)}
        error={errors.transmission?.message}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
        {initialData ? t('buttonSaveChanges') : t('buttonAddCar')}
      </Button>
    </Box>
  );
}
