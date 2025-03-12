import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Divider, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { carService } from '../../api/CarService';
import { CarDetailsDTO } from '../../model/dto/car/carDetailsDTO';
import useDeleteCar from '../../hooks/car/useDeleteCar';
import { carExtraService } from '../../api/CarExtraService';
import { ExtraDetailsDTO } from '../../model/dto/extra/extraDetailsDTO';
import ExtraForm from '../extra/ExtraForm';
import { ExtraInDTO } from '../../model/dto/extra/extraInDTO';
import useCreateExtra from '../../hooks/extra/useCreateExtra';
import useDeleteExtra from '../../hooks/extra/useDeleteExtra';
import ExtraList from './carDetailsComponents/ExtraList';
import MainButtons from './carDetailsComponents/MainButtons';
import CarFields from './carDetailsComponents/CarFields';

function CarDetailsPage() {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<CarDetailsDTO | null>(null);
  const [carExtras, setCarExtras] = useState<ExtraDetailsDTO[]>([]);
  const navigate = useNavigate();
  const deleteCarMutation = useDeleteCar();
  const { t } = useTranslation();

  const [showAddExtraForm, setShowAddExtraForm] = useState<boolean>(false); // extra hozzaadasa form behozasa

  const createExtraMutation = useCreateExtra();
  const deleteExtraMutation = useDeleteExtra();

  // TODO: extra frissitese innen
  useEffect(() => {
    if (carId) {
      carService
        .getCarById(Number(carId))
        .then((data) => setCar(data))
        .catch((error) => console.error(error));

      carExtraService
        .getCarExtrasById(Number(carId))
        .then((data) => setCarExtras(data))
        .catch((error) => console.error(error));
    }
  }, [carId]);

  console.log({ carExtras });

  const handleEdit = () => {
    console.log('Handle modify car');
    navigate(`/modify_car/${carId}`);
  };

  const handleExtraForm = () => {
    console.log('Handle clicked add extra button');
    setShowAddExtraForm(true);
  };

  const handleDelete = () => {
    if (carId) {
      deleteCarMutation.mutate(Number(carId));
    }
  };

  const handleAddExtra = (extraData: ExtraInDTO) => {
    console.log('Handle add extra to car');

    // eloszor letre kell hozzuk az extrat
    createExtraMutation.mutate(extraData, {
      onSuccess: (data) => {
        // elerjuk az uj extra id-jat
        const extraId = data.id;
        console.log({ extraId });
        console.log('sikeres hozzzaaaadas');

        carExtraService
          .addExtraToCar(Number(carId), Number(extraId))
          .then((data2) => {
            setCarExtras(data2);
          })
          .catch((error) => console.error(error));
      },
    });

    setShowAddExtraForm(false);
  };

  const handleUpdateExtra = (extraId: number) => {
    console.log('Handle add extra to car');
    navigate(`/modify_extra/${extraId}`);

    setShowAddExtraForm(false);
  };

  // utana csak osszekotjuk a kocsival
  const handleDeleteExtra = (extraId: number) => {
    // kell frissiteni az extrakat
    if (extraId) {
      deleteExtraMutation.mutate(Number(extraId), {
        onSuccess: () => {
          carExtraService
            .getCarExtrasById(Number(carId))
            .then((data) => setCarExtras(data))
            .catch((error) => console.error(error));
        },
      });
    }
  };

  if (!car) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper sx={{ padding: 3, margin: '0 auto', maxWidth: 800 }}>
        <Typography variant="h5" gutterBottom>
          {t('pageCarDetails')}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            {/* az auto mezoi */}
            <CarFields car={car} />
          </Grid>
          <Grid component="div" xs={12} sm={6}>
            <Typography variant="h6">
              <strong>{t('extras')}:</strong>
            </Typography>

            {/* uj komponenskent */}
            <ExtraList
              carExtras={carExtras}
              handleUpdateExtra={handleUpdateExtra}
              handleDeleteExtra={handleDeleteExtra}
            />
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />

        {/* 3 gomb: edit, addextra es a delete */}
        <MainButtons
          onEdit={handleEdit}
          onAddExtra={handleExtraForm}
          onDelete={handleDelete}
          buttonText={{
            edit: t('buttonEdit'),
            addExtra: t('buttonAddExtra'),
            delete: t('buttonDelete'),
          }}
        />
      </Paper>

      {showAddExtraForm && <ExtraForm onSubmit={handleAddExtra} />}
    </Box>
  );
}

export default CarDetailsPage;
