// axios.ts
// Axios Middleware
// Credits: https://stackoverflow.com/questions/53256914/axios-middleware-to-use-in-all-instances-of-axios

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'; // eslint-disable-line
import moment from 'moment';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // Do something before request is sent
  const method: string = config.method ? config.method.toUpperCase() : '';
  console.log(`${moment().format()} (Out) ${method}: ${config.url}`);
  if (method === 'POST') {
    console.log('Body', JSON.stringify(config.data));
  }

  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor
axios.interceptors.response.use((response: AxiosResponse) => {
  // Do something with response data
  console.log(`${moment().format()} Response | ${response.status} |`,
    JSON.stringify(response.data));
  return response;
}, (error) => Promise.reject(error));

export default axios;
