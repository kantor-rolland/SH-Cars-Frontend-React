import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';
import { CarInDTO } from '../../model/dto/car/carInDTO';
import { carService } from '../../api/CarService';
import FormWithCSVExtended from './FormWithCSVExtended';
import useModifyCar from '../../hooks/car/useModifyCar';

function EditCarPage() {
  const { carId } = useParams<{ carId: string }>();
  const [initialData, setInitialData] = useState<CarInDTO | null>(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const car = await carService.getCarById(Number(carId));
        setInitialData(car);
      } catch (error) {
        console.error('Error fetching car details:', error);
        console.log('Failed to load car details.');
        console.log(t('getCarMessageError'));
      }
    };

    fetchCarData();
  }, [carId]);

  const useModifyCarMutation = useModifyCar(Number(carId));

  const handleUpdateCar = (carData: CarInDTO) => {
    useModifyCarMutation.mutate(carData);
  };

  return initialData ? (
    <FormWithCSVExtended initialData={initialData} onSubmit={handleUpdateCar} />
  ) : (
    <p>{t('loadingCarDataMessage')}</p>
  );
}

export default EditCarPage;
