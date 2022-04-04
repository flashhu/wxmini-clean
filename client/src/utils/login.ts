import Taro, { UserInfo } from '@tarojs/taro';
import { getTokenByCode } from '@/service/user';

/**
 * 调用接口获取登录凭证
 */
export const getWXCode = () => {
  return new Promise<string>(resolve => {
    Taro.login({
      success: res => { resolve(res.code) },
      fail: err => { console.log(err) }
    })
  })
}

/**
 * 用户信息
 */
export const getWXUserInfo = () => {
  return new Promise<UserInfo>((resolve, reject) => {
    Taro.getUserProfile({
      desc: '用于完善会员资料',
      success: async (res) => {
        resolve(res.userInfo);
      },
      fail: err => {
        console.log(err);
        reject(err);
      },
    })
  })
}

/**
 * 通过code获取token
 * 登录 / token 过期时会调用
 */
export const getToken = async () => {
  const code = await getWXCode();
  const { token } = await getTokenByCode({ type: 100, account: code }) || {};
  return token;
}