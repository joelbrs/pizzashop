import { setDataResponse, setErrorResponse } from '../utils/ResponseHandler'
import type HttpClient from './HttpClient'

export default class HttpHandler {
  constructor(private readonly _client: HttpClient) {}

  async post<T>(url: string, body: Object) {
    try {
      const data = await this._client.post<T>(url, body)
      return setDataResponse<T>(data)
    } catch (err) {
      return setErrorResponse(err as Error)
    }
  }
}
