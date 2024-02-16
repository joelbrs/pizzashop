import $axios from '@/lib/axios'
import type HttpClient from '@/infra/http/HttpClient'
import type { AxiosInstance } from 'axios'

export default class AxiosAdapter implements HttpClient {
  private _client: AxiosInstance = $axios

  async post<T>(url: string, body: Object): Promise<T> {
    const { data } = await this._client.post<T>(url, body)
    return data
  }
}
