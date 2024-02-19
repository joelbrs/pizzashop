import { $dayjs } from '@/lib/day-js'

export function TimeToNow(time?: string) {
  if (time) {
    return $dayjs(time).fromNow()
  }
  return time
}

export function NowToTime(time?: string) {
  if (time) {
    return $dayjs(time).toNow()
  }
  return time
}
