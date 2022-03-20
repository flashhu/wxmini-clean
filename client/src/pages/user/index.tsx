import { FC, useState } from 'react'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { DEFAULT_USERNAME, LOGO } from './config'
import DEFAULT_AVATAR from '@/static/ico_user.png';
import ICON_ARROW from '@/static/ico_right.png';
import ICON_GOODS from '@/static/ico_goods.png';
import ICON_ORDER from '@/static/ico_order.png';
import './index.less'

const User: FC = () => {
  const [userName, setUserName] = useState(DEFAULT_USERNAME);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);

  useShareAppMessage(res => ({
      title: '艾尔森净化',
      imageUrl: LOGO,
      path: '/pages/order/index'
  }))

  useDidShow(() => {
    // TODO: token
    const u = Taro.getStorageSync('user');
    const user = u ? JSON.parse(u) : null;
    if (user !== null) {
      console.log('get user', user);
      setUserName(user.name);
      setAvatar(user.img);
    }
  })

  const handleLogin = () => {
    if (userName === DEFAULT_USERNAME) {
      Taro.navigateTo({ url: '/pages/launch/index' });
    }
  }

  const handleLogout = () => {
    setUserName(DEFAULT_USERNAME);
    setAvatar(DEFAULT_AVATAR);
    Taro.setStorageSync('user', null);
    Taro.switchTab({ url: `/pages/order/index` });
  }

  const goToOrderList = () => {
    Taro.navigateTo({ url: `/pages/his_order/index` })
  }

  const goToShoppingList = () => {
    Taro.navigateTo({ url: `/pages/his_shopping/index` })
  }

  return (
    <View className='g-user'>
      <View className="m-row" onClick={handleLogin}>
        <View className="m-logo">
          <Image src={avatar}></Image>
        </View>
        <View className="m-login">{userName}</View>
        {(userName === DEFAULT_USERNAME) &&
          <View className="m-arrow">
            <Image src={ICON_ARROW}></Image>
          </View>}
      </View>
      <View className="m-sect">
        {(userName !== DEFAULT_USERNAME) &&
          <>
            <View className="m-row" onClick={goToOrderList}>
              <View className="m-icon">
                <Image src={ICON_ORDER}></Image>
              </View>
              <Text className="m-txt">历史订单</Text>
              <View className="m-arrow">
                <Image src={ICON_ARROW}></Image>
              </View>
            </View>
            <View className="m-row" onClick={goToShoppingList}>
              <View className="m-icon">
                <Image src={ICON_GOODS}></Image>
              </View>
              <Text className="m-txt">历史购物</Text>
              <View className="m-arrow">
                <Image src={ICON_ARROW}></Image>
              </View>
            </View>
          </>
          }
      </View>
      {(userName && userName != "请登录") &&
        <View className="fn-btn-danger">
          <Text onClick={handleLogout}>退出登录</Text>
        </View>
      }
    </View>
  )
}

export default User;