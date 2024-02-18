import type { OrdersDTOOut } from '@/@types'
import HttpFactory from '@/factories/HttpFactory'

const base = 'orders'
const httpClient = HttpFactory(base)

export function getOrders(params: Object) {
  return httpClient.get<OrdersDTOOut>('', params)
}

export function approveOrder(id: string) {
  return httpClient.patch<void>(`${id}/approve`)
}

export function dispatchOrder(id: string) {
  return httpClient.patch<void>(`${id}/dispatch`)
}

export function deliverOrder(id: string) {
  return httpClient.patch<void>(`${id}/deliver`)
}

export function cancelOrder(id: string) {
  return httpClient.patch<void>(`${id}/cancel`)
}