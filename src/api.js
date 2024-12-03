import axios from "axios";
import axiosRetry from 'axios-retry'

const instance = axios.create({
    baseURL: 'https://cnpm-api.vercel.app/',
    timeout: 5000,
    maxBodyLength: Infinity,
    
});
axiosRetry(instance, { retries: 3 });

export default instance