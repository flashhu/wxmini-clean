import { makeAutoObservable } from "mobx"
import Taro, { UserInfo } from '@tarojs/taro'

class UserStore {
  user = 'test';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(name: string) {
    this.user = name;
  }

  /**
   * 调用接口获取登录凭证
   */
  getWXCode() {
    return new Promise ( resolve => {
      Taro.login({
        success: res => { resolve(res.code) },
        fail:    err => { console.log(err) }
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
    // 1. 获取用户信息
    const info = await this.getWXUserInfo();
    const user = {
      name: info.nickName,
      city: info.city,
      prov: info.province,
      img: info.avatarUrl
    };
    Taro.setStorageSync('user',JSON.stringify(user));
    // 2. 获取 openid，将带有映射关系的 uid 保存到 token 中
    const code = await this.getWXCode();
    // TODO: token
    console.log('code', code);
    // const
  }
}

export default new UserStore();