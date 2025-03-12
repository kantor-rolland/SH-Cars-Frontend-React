import { CarInDTO } from '../model/dto/car/carInDTO';

// ez csak a csv adata
export type CarData = {
  make: string;
  model: string;
  year: string;
};

export type FieldName =
  | 'price'
  | 'mileage'
  | 'name'
  | 'year'
  | 'brand'
  | 'cubicCapacity'
  | 'carPower'
  | 'fuelType'
  | 'transmission';

export type CarFormProps = {
  initialData?: CarInDTO | null;
  onSubmit: (data: CarInDTO) => void;
};
