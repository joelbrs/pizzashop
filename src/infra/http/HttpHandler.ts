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

  async post<T>(url: string, body: Object) {
    try {
      const data = await this._client.post<T>(this.constructUrl(url), body)
      return setDataResponse<T>(data)
    } catch (err) {
      return setErrorResponse(err as Error)
    }
  }
}
