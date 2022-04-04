import { makeAutoObservable } from "mobx"
import Taro from '@tarojs/taro'
import { User } from '@/typings/user';
import { getWXUserInfo, getToken } from '@/utils/login';

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login() {
    try {
      // 1. 获取用户信息
      const info = await getWXUserInfo();
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
      const token = await getToken();
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