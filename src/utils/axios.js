import axios from 'axios';
import { baseUrl, adminBaseUrl } from './constants';
import Swal from 'sweetalert2';
const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `bearer ${JSON.parse(
            localStorage.getItem("userToken")
        )}`,
        "apikey":
            "key $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
    }
});
const adminInstance = axios.create({
    baseURL: adminBaseUrl,
    headers: {
        apikey:
            "key $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
    }
});
instance.interceptors.request.use((config) => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (userToken) {
      config.headers.authorization = `Bearer ${userToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
adminInstance.interceptors.request.use((config) => {
    const adminToken = JSON.parse(localStorage.getItem('adminToken'));
    if (adminToken) {
      config.headers.authorization = `Bearer ${adminToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            new Swal("Please", "Login Again to Continue", "warning")
            setTimeout(function () {
                localStorage.removeItem('userToken');
                window.location.href = '/user/login';
            }, 3000);
        }
        return Promise.reject(error);
    }
);

adminInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            new Swal("Please", error.response.data.message, "warning")
            setTimeout(function () {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin';
            }, 3000);
        }
        return Promise.reject(error);
    }
);

export default instance;
export { adminInstance }