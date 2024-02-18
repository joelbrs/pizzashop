import type { Pagination } from '.'
type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

export interface OrdersDTOOut {
  orders: Order[]
  meta: Pagination
}

export interface Order {
  orderId: string
  createdAt: string
  status: OrderStatus
  customerName: string
  total: number
}
