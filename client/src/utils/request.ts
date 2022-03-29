import Taro from '@tarojs/taro';
import { Base64 } from 'js-base64'
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

const encode = () => {
  const token = Taro.getStorageSync('token')
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

const errorHandler = error => {
  const { data = {} } = error;
  let msg = '网络异常, 请重试'
  if (data.msg instanceof Array && data.msg.length > 0) {
    // showtoast 对提示有字数限制
    msg = data.msg[0];
  } else if (typeof (data.msg) === "string") {
    msg = data.msg;
  }
  if (data.error_code === 1001) {
    // TODO: token 过期，重新获取
  }
  Taro.showToast({
    icon: 'none',
    title: msg
  })
  console.log(data);
}

export const baseOptions = async (params, method: 'GET' | 'POST' = 'GET') => {
  const { url, data, header } = params || {};
  return new Promise((resolve, reject) => {
    Taro.request({
      url: API_SERVER + url,
      data: data,
      method: method,
      header: {
        ...header,
        'Authorization': encode()
      },
      success(res) {
        if (res.statusCode === HTTP_STATUS.SUCCESS && Number(res?.data?.error_code ?? 0) === 0) {
          // 操作成功 / 获取数据
          resolve(res?.data);
        } else {
          // 后端拦截错误
          console.log('请求接口出现问题1:', res, url);
          errorHandler(res);
          reject(res);
        }
      },
      fail(e) {
        console.log('请求接口出现问题2: ', e, url);
        Taro.showToast({
          icon: 'none',
          title: '网络异常, 请重试'
        })
        reject(e);
      }
    })
  })
};

export const get = (option: {
  url: string,
  data?: string,
  header?: object
}) => {
  return baseOptions(option)
}

export const post = (params: {
  url: string,
  data,
  header?: object
}) => {
  return baseOptions(params, 'POST')
}