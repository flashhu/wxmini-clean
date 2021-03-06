import { get, post } from '@/utils/request';
import { BuyGoodRequestParam, CommentOrderRequestParam } from '@/typings/good_order';

export const getGoods = (): Promise<any> => {
  return get({
    url: '/v1/shop/goodList'
  })
}

export const getGoodDetail = (id: number): Promise<any> => {
  return get({
    url: `/v1/shop/goodDetail/${id}`
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

export const commentOrder = (data: CommentOrderRequestParam): Promise<any> => {
  return post({
    url: '/v1/shop/comment',
    data
  })
}