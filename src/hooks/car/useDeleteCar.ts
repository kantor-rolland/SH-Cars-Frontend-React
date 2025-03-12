import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../query/common.query';
import { carService } from '../../api/CarService';

// kiszedve kulon
export default function useDeleteCar() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => carService.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      navigate('/cars');
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
