import { setDataResponse, setErrorResponse } from '../utils/ResponseHandler'
import type HttpClient from './HttpClient'

export default class HttpHandler {
  constructor(
    private readonly _client: HttpClient,
    private readonly _baseUrl?: string
  ) {}

  private constructUrl(url: string) {
    if (this._baseUrl) {
      return `${this._baseUrl}/${url}`
    }
    return `${url}`
  }

  async get<T>(url: string, params?: Object) {
    try {
      const data = await this._client.get<T>(this.constructUrl(url), params)
      return setDataResponse<T>(data)
    } catch (err) {
      return setErrorResponse(err as Error)
    }
  }

  async post<T>(url: string, body: Object) {
    try {
      const data = await this._client.post<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (err) {
      return setErrorResponse(err as Error)
    }
  }

  async patch<T>(url: string, body?: Object) {
    try {
      const data = await this._client.patch<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (err) {
      return setErrorResponse(err as Error)
    }
  }
}
