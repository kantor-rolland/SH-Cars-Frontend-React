import axios from 'axios';
import { Constants } from '../util/Constants';
import { ExtraDetailsDTO } from '../model/dto/extra/extraDetailsDTO';
import { ExtraInDTO } from '../model/dto/extra/extraInDTO';

// axios példány közös beállításokkal
const extraApi = axios.create({
  // közös kiinduló URL
  baseURL: Constants.BASE_URL,
  // közös headerek, pl. accept, token
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const extraService = {
  // all cars
  getAllExtras: async (): Promise<ExtraDetailsDTO[]> => {
    console.log('GET ALL eXTRAS - SERVICE');
    const response = await extraApi.get<ExtraDetailsDTO[]>(Constants.EXTRAS_URL);
    return response.data;
  },

  // todo: visszateritesi ertekek
  createExtra: async (extraData: ExtraInDTO): Promise<ExtraDetailsDTO> => {
    const response = await extraApi.post<ExtraDetailsDTO>(Constants.EXTRAS_URL, extraData);
    return response.data;
  },

  getExtraById: async (id: number): Promise<ExtraDetailsDTO> => {
    const response = await extraApi.get<ExtraDetailsDTO>(`${Constants.EXTRAS_URL}/${id}`);
    return response.data;
  },

  getExtrasByName: async (name: string): Promise<ExtraDetailsDTO[]> => {
    const response = await extraApi.get<ExtraDetailsDTO[]>(`${Constants.EXTRAS_URL}/name/${name}`);
    return response.data;
  },

  updateExtra: async (id: number, extraData: ExtraInDTO): Promise<string> => {
    const response = await extraApi.put<string>(`${Constants.EXTRAS_URL}/${id}`, extraData);
    return response.data;
  },

  deleteExtra: async (id: number): Promise<string> => {
    const response = await extraApi.delete<string>(`${Constants.EXTRAS_URL}/${id}`);
    return response.data;
  },
};
