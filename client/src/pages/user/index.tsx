import { FC, useState } from 'react'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { DEFAULT_USERNAME, LOGO, Menus } from './config'
import DEFAULT_AVATAR from '@/static/ico_user.png';
import ICON_ARROW from '@/static/ico_right.png';
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
    const u = Taro.getStorageSync('user');
    const user = u ? JSON.parse(u) : null;
    if (user !== null) {
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
    Taro.showModal({
      content: '是否确认退出该账号？',
      success: function (res) {
        if (res.confirm) {
          setUserName(DEFAULT_USERNAME);
          setAvatar(DEFAULT_AVATAR);
          Taro.setStorageSync('user', undefined);
          Taro.setStorageSync('token', undefined);
        }
      }
    })
  }

  const goToOtherPage = (url: string) => {
    Taro.navigateTo({ url })
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
            {Menus?.map((item, index) => (
              <View
                key={index}
                className="m-row"
                onClick={() => { goToOtherPage(item?.url) }}
              >
                <View className="m-icon">
                  <Image src={item?.icon}></Image>
                </View>
                <Text className="m-txt">{item?.title}</Text>
                <View className="m-arrow">
                  <Image src={ICON_ARROW}></Image>
                </View>
              </View>
            ))}
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