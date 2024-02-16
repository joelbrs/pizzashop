import type { RestaurantDTOIn, RestaurantDTOOut } from '@/@types'
import HttpFactory from '@/factories/HttpFactory'

const base = 'restaurants'
const httpClient = HttpFactory(base)

export function createRestaurant(body: RestaurantDTOIn) {
  return httpClient.post<RestaurantDTOOut>('', body)
}
