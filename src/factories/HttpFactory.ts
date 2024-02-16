import HttpHandler from '@/infra/http/HttpHandler'
import AxiosAdapter from '@/infra/http/adapters/AxiosAdapter'

export default function HttpFactory(baseUrl?: string): HttpHandler {
  const adapter = new AxiosAdapter()
  return new HttpHandler(adapter, baseUrl)
}
