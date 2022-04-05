import Taro, { useDidShow } from '@tarojs/taro'

/**
 * 未登录时跳转到登录页
 */
const useCheckLogin = () => {
  useDidShow(() => {
    const u = Taro.getStorageSync('user');
    if(!u) {
      Taro.navigateTo({ url: '/pages/launch/index' });
    }
  })
}

export default useCheckLogin;