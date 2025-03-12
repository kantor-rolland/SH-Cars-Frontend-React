import axios from 'axios';
import { CarDetailsDTO } from '../model/dto/car/carDetailsDTO';
import { CarInDTO } from '../model/dto/car/carInDTO';

export const BASE_URL = '/cars';

// axios példány közös beállításokkal
const carApi = axios.create({
  // közös kiinduló URL
  baseURL: 'http://localhost:8080/',
  // közös headerek, pl. accept, token
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const carService = {
  // all cars
  getAllCars: async (): Promise<CarDetailsDTO[]> => {
    const response = await carApi.get<CarDetailsDTO[]>('/cars');
    return response.data;
  },

  getCarsByYear: async (year: number): Promise<CarDetailsDTO[]> => {
    const response = await carApi.get<CarDetailsDTO[]>(`$year/${year}`);
    return response.data;
  },

  getCarsByBrand: async (brand: string): Promise<CarDetailsDTO[]> => {
    const response = await carApi.get<CarDetailsDTO[]>(`/brand/${brand}`);
    return response.data;
  },

  createCar: async (carData: CarInDTO): Promise<string> => {
    const response = await carApi.post<string>(BASE_URL, carData);
    return response.data;
  },

  getCarById: async (id: number): Promise<CarDetailsDTO> => {
    const response = await carApi.get<CarDetailsDTO>(`/cars/${id}`);
    return response.data;
  },

  updateCar: async (id: number, carData: CarInDTO): Promise<string> => {
    const response = await carApi.put<string>(`/cars/${id}`, carData);
    return response.data;
  },

  deleteCar: async (id: number): Promise<string> => {
    const response = await carApi.delete<string>(`/cars/${id}`);
    return response.data;
  },
};
