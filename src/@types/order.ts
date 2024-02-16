import type { Pagination } from '.'

export interface OrdersDTOOut {
  orders: Order[]
  meta: Pagination
}

export interface Order {
  orderId: string
  createdAt: string
  status: string
  customerName: string
  total: number
}
