import type { Pagination } from '.'
export type OrderStatus = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

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

export interface OrderDetailDTOOut {
  id: string
  createdAt: string
  status: OrderStatus
  totalInCents: number
  customer: Customer
  orderItems: OrderItem[]
}

export interface Customer {
  name: string
  phone: any
  email: string
}

export interface OrderItem {
  id: string
  priceInCents: number
  quantity: number
  product: Product
}

export interface Product {
  name: string
}
