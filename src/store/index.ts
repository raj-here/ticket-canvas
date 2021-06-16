import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { reducer as form } from 'redux-form';
import { combineReducer } from '../reducer';

const client = axios.create({
  baseURL: 'http://localhost:8081',
  responseType: 'json'
});

export const store = createStore(
  combineReducers({ combineReducer, form }),
  applyMiddleware(
    axiosMiddleware(client), //second parameter options can optionally contain onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
)