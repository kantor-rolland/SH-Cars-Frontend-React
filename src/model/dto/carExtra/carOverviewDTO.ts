import { ExtraDetailsDTO } from '../extra/extraDetailsDTO';

export type CarExtraOverviewDTO = {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;

  // uj mezok
  mileage: number;
  cubicCapacity: number;
  carPower: number;

  extras: ExtraDetailsDTO[];
};
