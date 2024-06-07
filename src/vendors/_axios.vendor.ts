import { type App } from 'vue'
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError
} from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

type AxiosOptions = {
  baseURL: string
}

export default {
  install: (app: App, options: AxiosOptions) => {
    const $axios: AxiosInstance = axios.create({
      baseURL: options.baseURL,
      // baseURL: 'https://httpstat.us/',
      headers: {
        'Content-Type': 'application/json'
        // Add other headers if needed
      }
    })

    axios.interceptors.request.use(
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

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // Handle the response, log it, or modify it
        console.log('Received response from:', response.config.url)
        return response
      },
      (error: AxiosError) => {
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

    app.config.globalProperties.$axios = $axios
  }
}
