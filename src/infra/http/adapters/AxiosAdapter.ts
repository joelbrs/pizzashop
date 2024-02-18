import $axios from '@/lib/axios'
import type HttpClient from '@/infra/http/HttpClient'
import type { AxiosInstance } from 'axios'

export default class AxiosAdapter implements HttpClient {
  private _client: AxiosInstance = $axios

  async get<T>(url: string, params?: Object) {
    const { data } = await this._client.get<T>(url, { params: params })
    return data
  }

  async post<T>(url: string, body?: Object): Promise<T> {
    const { data } = await this._client.post<T>(url, body)
    return data
  }

  async patch<T>(url: string, body?: Object): Promise<T> {
    const { data } = await this._client.patch<T>(url, body)
    return data
  }
}
