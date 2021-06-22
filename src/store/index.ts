import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import { rootReducer } from '../reducer';

const client = axios.create({
  baseURL: 'http://localhost:8081',
  responseType: 'json'
});

client.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
)