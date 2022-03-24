import { makeAutoObservable } from "mobx"
import Taro, { UserInfo } from '@tarojs/taro'
import { User } from '@/typings/user';
import { getTokenByCode } from '@/service/user';

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 调用接口获取登录凭证
   */
  getWXCode() {
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
  getWXUserInfo() {
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

  async login() {
    try {
      // 1. 获取用户信息
      const info = await this.getWXUserInfo();
      const user = {
        name: info.nickName,
        city: info.city,
        prov: info.province,
        img: info.avatarUrl
      };
      // 2. 获取 openid，将带有映射关系的 uid 保存到 token 中
      Taro.showLoading({
        title: '加载中',
      })
      const code = await this.getWXCode();
      const { token } = await getTokenByCode({ type: 100, account: code }) || {};
      Taro.hideLoading();
      Taro.setStorageSync('user', JSON.stringify(user));
      Taro.setStorageSync('token', token);
      Taro.navigateBack();
    } catch (error) {
      console.log(error);
      Taro.hideLoading();
    }
  }
}

export default new UserStore();