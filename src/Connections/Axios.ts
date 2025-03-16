import axios, { AxiosError } from "axios";

function API() {
    const baseUrl = process.env.API_SEND_EMAIL;
    
    const api = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.request.use(request => {
        return request;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        return Promise.reject(error);
    });

    return api;
}

export {
    API
}