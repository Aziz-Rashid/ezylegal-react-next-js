import axios from "axios";

const BASE_URL = 'https://backend.ezylegal.in:4000/graphql';

const backendApi = axios.create({
    baseURL: BASE_URL
});

export default backendApi;