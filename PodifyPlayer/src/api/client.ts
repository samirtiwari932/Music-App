import axios from 'axios';
import {Keys, getFromAsyncStorage} from 'src/utilis/asyncStorage';
import {CreateAxiosDefaults} from 'axios';
const client = axios.create({
  baseURL: 'http://192.168.123.4:8989',
});

type headers = CreateAxiosDefaults<any>['headers'];

const baseURL = 'http://192.168.123.4:8989';
export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.Auth_Token);

  if (!token) return axios.create({baseURL});

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  return axios.create({baseURL, headers: defaultHeaders});
};

export default client;
