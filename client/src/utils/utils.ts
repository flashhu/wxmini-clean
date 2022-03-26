/**
 * 取数字的小数部分 2.5 -> '50'
 * @param n
 * @returns string
 */
export const fract = (n: number | string) =>
  ((Number(n) - Math.trunc(Number(n))) * 100).toString().padEnd(2, '0');