import axios, { type CreateAxiosDefaults } from 'axios'
import { useRouter } from 'vue-router'

const $router = useRouter()

const config: CreateAxiosDefaults = {
  baseURL: import.meta.env.VIE_API_BASE_URL,
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
      //TODO: implement log out
      $router.push({ name: 'login' })
    }
  }
)

export default $axios
