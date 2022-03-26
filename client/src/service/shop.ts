import { get, post } from '@/utils/request';
import { BuyGoodRequestParam } from '@/typings/good_order';

export const getGoods = (): Promise<any> => {
  return get({
    url: '/v1/shop/goodList'
  })
}

export const getGoodOrders = (): Promise<any> => {
  return get({
    url: '/v1/shop/orderList'
  })
}

export const buyGoods = (data: BuyGoodRequestParam): Promise<any> => {
  return post({
    url: '/v1/shop/buy',
    data
  })
}