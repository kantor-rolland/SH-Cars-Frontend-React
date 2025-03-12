import { CarInDTO } from '../../model/dto/car/carInDTO';
import FormWithCSVExtended from './FormWithCSVExtended';
import useCreateCar from '../../hooks/car/useCreateCar';

function AddCarPage() {
  const createCarMutation = useCreateCar();

  const handleAddCar = (carData: CarInDTO) => {
    createCarMutation.mutate(carData);
  };

  return <FormWithCSVExtended onSubmit={handleAddCar} />;
}

export default AddCarPage;
