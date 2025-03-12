import { useQuery } from '@tanstack/react-query';
import { carService } from '../../api/CarService';
import { CarDetailsDTO } from '../../model/dto/car/carDetailsDTO';

export default function useFindCarById(carId: number) {
  return useQuery<CarDetailsDTO>({
    queryKey: ['car', carId],

    queryFn: () => carService.getCarById(carId),
    enabled: !!carId,
  });
}
