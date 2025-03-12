import axios from 'axios';
import { Constants } from '../util/Constants';
import { ExtraDetailsDTO } from '../model/dto/extra/extraDetailsDTO';

// axios példány közös beállításokkal
const carExtraApi = axios.create({
  // közös kiinduló URL
  baseURL: Constants.BASE_URL,
  // közös headerek, pl. accept, token
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// TODO: dto-k
export const carExtraService = {
  getCarExtrasById: async (carId: number): Promise<ExtraDetailsDTO[]> => {
    console.log('CAR EXTRA SERVICE');
    const response = await carExtraApi.get<ExtraDetailsDTO[]>(`${Constants.CARS_URL}/${carId}${Constants.EXTRAS_URL}`);
    console.log('Response');
    console.log({ response });
    return response.data;
  },

  addExtraToCar: async (carId: number, extraId: number): Promise<ExtraDetailsDTO[]> => {
    const response = await carExtraApi.post<ExtraDetailsDTO[]>(
      `${Constants.CARS_URL}/${carId}${Constants.EXTRAS_URL}/${extraId}`,
    );
    return response.data;
  },

  // TODO ennek a hasznalata
  deleteExtraFromCar: async (carId: number, extraId: number): Promise<string> => {
    const response = await carExtraApi.delete<string>(
      `${Constants.CARS_URL}/${carId}/${Constants.EXTRAS_URL}/${extraId}`,
    );
    return response.data;
  },
};
