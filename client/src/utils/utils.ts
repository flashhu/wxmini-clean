import * as dayjs from 'dayjs'

/**
 * 取数字的小数部分 2.5 -> '50'
 * @param n
 * @returns string
 */
export const fract = (n: number | string) =>
  ((Number(n) - Math.trunc(Number(n))) * 100).toFixed(0).toString().padEnd(2, '0');

/**
 * 比较某日期是否在n天前之内
 * @param curr 'YYYYMMDDHHmmss'
 * @param prevNum n
 */
export const isInPeriod = (curr: string, prevNum?: number) => {
  const prev = dayjs().subtract(prevNum || 7, 'day').format('YYYYMMDDHHmmss');
  return curr >= prev;
}