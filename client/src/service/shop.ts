import { get } from '@/utils/request';

export const getGoods = (): Promise<any> => {
  return get({
    url: '/v1/shop/goodList'
  })
}