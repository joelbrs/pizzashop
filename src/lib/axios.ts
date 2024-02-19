import axios, { type CreateAxiosDefaults } from 'axios'

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
}

const $axios = axios.create(config)

$axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/sign-in'
    }
  }
)

export default $axios
