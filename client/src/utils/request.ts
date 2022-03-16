import Taro from '@tarojs/taro';
import { API_SERVER } from '@/constant/apis';

const HTTP_STATUS = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
}

export const baseOptions = async (params, method: 'GET' | 'POST' = 'GET') => {
  const { url, data } = params || {};
  const contentType = params.contentType || 'application/x-www-form-urlencoded';
  return new Promise((resolve, reject) => {
    Taro.request({
      url: API_SERVER + url,
      data: data,
      method: method,
      // TODO: ADD TOKEN
      header: { 'content-type': contentType },
      success(res) {
        if (res.statusCode === HTTP_STATUS.SUCCESS && Number(res?.data?.error_code ?? 0) === 0) {
          // 操作成功 / 获取数据
          resolve(res?.data);
        } else {
          // 后端拦截错误
          console.log('请求接口出现问题:', res);
          reject(res);
        }
      },
      fail(e) {
        console.log('请求接口出现问题: ', e);
        reject(e);
      }

    })
  })
};

export const get = (option: {
  url: string,
  data?: string
}) => {
  return baseOptions(option)
}

export const post = (params: {
  url: string,
  data,
  contentType?: string
}) => {
  return baseOptions(params, 'POST')
}