import HttpFactory from '@/factories/HttpFactory'

const httpClient = HttpFactory()

export function postAuthenticate(params: Object) {
  return httpClient.post<void>('authenticate', params)
}

export function postLogOut() {
  return httpClient.post<void>('sign-out')
}