import axios from 'axios';
import api from './api';
import Pokemon from './pokemon';
import Pokemons from './pokemons';

interface ExceptionError {
  status: number | undefined;
  error: any | undefined;
}

const getAll = async (offset = 0, limit = 20): Promise<Pokemons | ExceptionError | undefined> => {
  try {
    const { data } = await api.get<Pokemons>(`/pokemons?offset=${offset}&limit=${limit}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response?.data,
      };
    }
    return undefined;
  }
};

const get = async (id: number): Promise<Pokemon | ExceptionError | undefined> => {
  try {
    const { data } = await api.get<Pokemon>(`/pokemons/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status,
        error: error.response?.data,
      };
    }
    return undefined;
  }
};

const pokemonService = {
  getAll,
  get,
};

export default pokemonService;
