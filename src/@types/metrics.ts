export interface MonthReceipt {
  diffFromLastMonth: number
  receipt: number
}

export interface MonthAmounts {
  diffFromLastMonth: number
  amount: number
}

export interface DayAmounts {
  diffFromYesterday: number
  amount: number
}

export interface DailyReceipt {
  date: string
  receipt: number
}

export interface PopularProduct {
  product: string
  amount: number
}
