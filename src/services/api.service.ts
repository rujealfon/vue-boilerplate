import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json'
    // Add other headers if needed
  }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Modify the request or log it before sending
    console.log('Starting request to:', config.url)
    // Add authorization header if needed
    // config.headers['Authorization'] = `Bearer YOUR_TOKEN`;
    return config
  },
  (error: AxiosError) => {
    // Handle request errors
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle the response, log it, or modify it
    console.log('Received response from:', response.config.url)
    return response
  },
  (error: AxiosError) => {
    // Handle response errors
    console.error('Response error:', error)
    return Promise.reject(error)
  }
)

export default api
