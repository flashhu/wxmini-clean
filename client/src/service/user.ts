import { post } from '@/utils/request';
import { TokenRequestParams } from '@/typings/user';

export const getTokenByCode = (data: TokenRequestParams): Promise<any> => {
  return post({
    url: '/v1/token',
    data
  })
}