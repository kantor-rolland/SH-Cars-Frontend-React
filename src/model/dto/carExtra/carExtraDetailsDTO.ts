import { ExtraDetailsDTO } from '../extra/extraDetailsDTO';

export type CarExtraDetailsDTO = {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  uploadDate: Date;

  /*
    // uj mezok
    mileage: number;
    cubicCapacity: number;
    carPower: number;
    fuelType: string;
    transmission: string;
    */
  extras: ExtraDetailsDTO[];
};
