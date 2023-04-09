import axios from 'axios';
import { baseUrl } from './constants';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `bearer ${JSON.parse(
            localStorage.getItem("userToken")
        )}`,
        apikey:
            "key $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
    }
});
const adminInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `bearer ${JSON.parse(
            localStorage.getItem("adminToken")
        )}`,
        apikey:
            "key $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
    }
});

export default instance;
export {adminInstance}