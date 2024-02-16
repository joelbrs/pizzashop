import HttpFactory from '@/factories/HttpFactory'

const base = 'authenticate'
const httpClient = HttpFactory(base)

export function postAuthenticate(params: Object) {
  return httpClient.post<void>('', params)
}
