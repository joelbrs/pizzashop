import { $dayjs } from '@/lib/day-js'

export function TimeToNow(time?: string) {
  return $dayjs(time).fromNow()
}

export function NowToTime(time?: string) {
  return $dayjs(time).toNow()
}
