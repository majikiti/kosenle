export function xor32(seed: number): number {
  let y = seed
  y = y ^ (y << 13)
  y = y ^ (y >>> 17)
  y = y ^ (y << 5)
  return Math.abs(y)
}

export function RndByDate(date: Date): number {
  const dateNum = parseInt(`${
    date.getYear()
  }${
    date.getMonth()
  }${
    date.getDate()
  }`)
  return xor32(dateNum)
}

export function RndToday(): number {
  return RndByDate(new Date())
}
