import type { MonthAmounts, MonthReceipt, DayAmounts } from '@/@types'
import HttpFactory from '@/factories/HttpFactory'

const base = 'metrics'
const httpClient = HttpFactory(base)

export function getMonthReceipt() {
  return httpClient.get<MonthReceipt>('month-receipt')
}

export function getOrdersAmount() {
  return httpClient.get<MonthAmounts>('month-orders-amount')
}

export function getDayOrdersAmount() {
  return httpClient.get<DayAmounts>('day-orders-amount')
}

export function getMonthCanceledOrdes() {
  return httpClient.get<MonthAmounts>('month-canceled-orders-amount')
}
