import { API_KEY_TMDB, API_URL_TMDB } from '@env'
import axios from 'axios'

export const api = axios.create({
  baseURL: API_URL_TMDB,
  params: {
    api_key: API_KEY_TMDB,
    language: "pt-BR",
    include_adults: false,
  },
});