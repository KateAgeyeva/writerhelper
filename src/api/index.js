import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({ 
    baseURL: 'http://c30d-77-169-121-159.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;