import { post, get } from '@/utils/request';
import { AddrItem } from '@/typings/address';

export const addAddress = (data: AddrItem): Promise<any> => {
  return post({
    url: '/v1/address/add',
    data
  })
}

export const getAddress = (): Promise<any> => {
  return get({
    url: '/v1/address/list'
  })
}

export const delAddress = (data: {id: number}): Promise<any> => {
  return post({
    url: '/v1/address/del',
    data
  })
}

export const updateAddress = (data: Partial<AddrItem>): Promise<any> => {
  return post({
    url: '/v1/address/update',
    data
  })
}