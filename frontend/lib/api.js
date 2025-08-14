import axios from 'axios';

export function apiClient() {
  return axios.create({
    baseURL: '',
  });
}
