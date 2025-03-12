import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../query/common.query';
import { CarInDTO } from '../../model/dto/car/carInDTO';
import { carService } from '../../api/CarService';

export default function useModifyCar(carId: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (carData: CarInDTO) => carService.updateCar(carId, carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['car', carId] });
      // alert(t('editCarMessageSuccessfully'));
      console.info('Car modified successfully');
      navigate(`/cars/${carId}`);
    },
    onError: (error) => {
      console.error('Error updating car:', error);
      console.log('Failed to update car.');
    },
  });
}
