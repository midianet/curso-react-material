import axios from 'axios';
import { Environment } from '../../../environment';
import { errorInterceptor, responseInteceptor } from './interceptors';

const Api = axios.create({
  baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
  (response) => responseInteceptor(response),
  (error)  => errorInterceptor(error),
);

export { Api };
