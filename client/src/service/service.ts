import { get, post } from '@/utils/request';
import { OrderServiceRequestParam } from '@/typings/service_order';

// 预约服务
export const orderService = (data: OrderServiceRequestParam): Promise<any> => {
  return post({
    url: '/v1/service/order',
    data
  })
}

export const getServiceOrders = (): Promise<any> => {
  return get({
    url: '/v1/service/orderList'
  })
}