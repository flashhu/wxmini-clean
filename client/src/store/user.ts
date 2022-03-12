import { makeAutoObservable } from "mobx"
import Taro from '@tarojs/taro'

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

  login() {
    return new Promise<void>((resolve, reject) => {
      Taro.getUserProfile({
        desc: '用于完善会员资料',
        success: async (res) => {
          const user = {
            name: res.userInfo.nickName,
            city: res.userInfo.city,
            prov: res.userInfo.province,
            img: res.userInfo.avatarUrl
          };
          console.log('set user', user);
          Taro.setStorageSync('user',JSON.stringify(user));
          resolve();
        },
        fail: err => {
          console.log(err);
          reject(err);
        },
      })
    })
  }
}

export default new UserStore();