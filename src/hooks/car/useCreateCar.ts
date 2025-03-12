import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { queryClient } from '../../query/common.query';
import { carService } from '../../api/CarService';
import { CarInDTO } from '../../model/dto/car/carInDTO';

// TODO: error messagek nemzetkoziesitese
export default function useCreateCar() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (carData: CarInDTO) => carService.createCar(carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      console.log('Sikeres letrehooozas');
      // alert(t('addCarMessageSuccessfully'));
      console.info(t('addCarMessageSuccessfully'));
      navigate('/cars');
    },
    onError: (error) => {
      console.error('Error creating car:', error);
      console.log('Failed to add car.');
    },
  });
}
