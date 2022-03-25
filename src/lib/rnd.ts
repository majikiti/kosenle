export function xor32(seed: number): number {
  let y = seed
  y = y ^ (y << 13)
  y = y ^ (y >>> 17)
  y = y ^ (y << 5)
  return Math.abs(y)
}

export function RndFromDate(date: Date): number {
  const dateNum = parseInt(`${
    date.getFullYear()
  }${
    date.getMonth()
  }${
    date.getDate()
  }`)
  return xor32(dateNum)
}
