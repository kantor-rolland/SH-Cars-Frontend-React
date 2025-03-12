import axios from 'axios';
import { CarDetailsDTO } from '../model/dto/car/carDetailsDTO';
import { CarInDTO } from '../model/dto/car/carInDTO';
import { Constants } from '../util/Constants';

// axios példány közös beállításokkal
const carApi = axios.create({
  // közös kiinduló URL
  baseURL: Constants.BASE_URL,
  // közös headerek, pl. accept, token
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const carService = {
  // all cars
  getAllCars: async (): Promise<CarDetailsDTO[]> => {
    console.log('GET ALL CARS - SERVICE');
    const response = await carApi.get<CarDetailsDTO[]>(Constants.CARS_URL);
    return response.data;
  },

  // a search fieldhez kell ez
  getCarsByBrandOrModel: async (query: string): Promise<CarDetailsDTO[]> => {
    console.log('GET CARS BY QUERY - SERVICE');
    const response = await carApi.get<CarDetailsDTO[]>(`${Constants.CARS_URL}/search`, { params: { query } });
    return response.data;
  },

  getCarsByYear: async (year: number): Promise<CarDetailsDTO[]> => {
    const response = await carApi.get<CarDetailsDTO[]>(`${Constants.YEAR_URL}/${year}`);
    return response.data;
  },

  getCarsByBrand: async (brand: string): Promise<CarDetailsDTO[]> => {
    const response = await carApi.get<CarDetailsDTO[]>(`${Constants.BRAND_URL}/${brand}`);
    return response.data;
  },

  createCar: async (carData: CarInDTO): Promise<string> => {
    const response = await carApi.post<string>(Constants.CARS_URL, carData);
    return response.data;
  },

  getCarById: async (id: number): Promise<CarDetailsDTO> => {
    const response = await carApi.get<CarDetailsDTO>(`${Constants.CARS_URL}/${id}`);
    return response.data;
  },

  updateCar: async (id: number, carData: CarInDTO): Promise<string> => {
    const response = await carApi.put<string>(`${Constants.CARS_URL}/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id: number): Promise<string> => {
    const response = await carApi.delete<string>(`${Constants.CARS_URL}/${id}`);
    return response.data;
  },
};
