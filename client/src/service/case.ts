import { get } from '@/utils/request';

export const getList = (): Promise<any> => {
  return get({
    url: '/v1/case/list'
  })
}