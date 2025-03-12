import { useQuery } from '@tanstack/react-query';
import { carService } from '../../api/CarService';
import { CarOverviewDTO } from '../../model/dto/car/carOverviewDTO';

export default function useFindCarsByQuery(query: string) {
  console.log({ query });

  return useQuery<CarOverviewDTO[]>({
    queryKey: ['cars', query], // cars + query
    // a query tartalma fuggvenyeben
    queryFn: query === '' ? carService.getAllCars : () => carService.getCarsByBrandOrModel(query),
  });
}
