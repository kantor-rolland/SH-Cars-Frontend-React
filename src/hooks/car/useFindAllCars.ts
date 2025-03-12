import { useQuery } from '@tanstack/react-query';
import { carService } from '../../api/CarService';
import { CarOverviewDTO } from '../../model/dto/car/carOverviewDTO';

export default function useFindAllCars() {
  return useQuery<CarOverviewDTO[]>({
    queryKey: ['cars'],
    queryFn: carService.getAllCars,
  });
}
