import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../query/common.query';
import { carExtraService } from '../../api/CarExtraService';

export default function useAddExtraToCar(carId: number, extraId: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => carExtraService.addExtraToCar(carId, extraId),
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
