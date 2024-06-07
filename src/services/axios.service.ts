import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios'
import { useToast } from 'vue-toastification'

// // Define ApiResponse interface for successful responses
// interface ApiResponse<T> extends AxiosResponse {
//   data: T
// }

// // Define CustomAxiosError interface for custom error handling
// interface CustomAxiosError<T> extends AxiosError {
//   response: ApiResponse<T>
// }

const toast = useToast()

const $axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: 'https://httpstat.us/',
  headers: {
    'Content-Type': 'application/json'
    // Add other headers if needed
  }
})

$axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Modify the request or log it before sending
    console.log('Starting request to:', config.url)
    // Add authorization header if needed
    // config.headers.Authorization = `Bearer YOUR_TOKEN`
    return config
  },
  (error: AxiosError) => {
    // Handle request errors
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    // Handle the response, log it, or modify it
    console.log('Received response from:', response.config.url)
    return response
  },
  (error: AxiosError<any>) => {
    // Show toast error
    toast.error(error.message)

    // Handle response errors
    console.error('Response error:', error)

    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
    } else {
      // Handle other errors
    }

    return Promise.reject(error)
  }
)

export default $axios
