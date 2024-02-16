import type { OrdersDTOOut } from '@/@types'
import HttpFactory from '@/factories/HttpFactory'

const base = 'orders'
const httpClient = HttpFactory(base)

export function getOrders(params: Object) {
  return httpClient.get<OrdersDTOOut>('', params)
}
