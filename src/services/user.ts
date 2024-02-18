import type { RestaurantDTOOut, UserDTOOut } from '@/@types'
import HttpFactory from '@/factories/HttpFactory'

const httpClient = HttpFactory()

export function getLoggedUser() {
  return httpClient.get<UserDTOOut>('/me')
}

export function getLoggedRestaurant() {
  return httpClient.get<RestaurantDTOOut>('/managed-restaurant')
}

export function putRestaurantInfos(params: Object) {
  return httpClient.put<void>('profile', params)
}