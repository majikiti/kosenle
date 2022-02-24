export function DateHash(date: Date): number {
  return 1
}

export function TodayDateHash(): number {
  return DateHash(new Date())
}
