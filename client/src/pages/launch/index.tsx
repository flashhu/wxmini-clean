import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { LOGO } from './config'
import userStore from '@/store/user'
import './index.less'

const Launch: FC = () => {
  const login = async () => {
    await userStore.login();
    Taro.navigateBack();
  }

  return (
    <View className='g-launch'>
      <View className="m-launch">
        <View className="m-sect">
          <View className="m-logo">
            <Image src={LOGO}></Image>
          </View>
        </View>
        <Button className="m-btn m-login" onClick={login} >微信帐号快捷登录</Button>
      </View>
      <View className="m-ft">
        <View className="m-info">登录即表示您已阅读、理解并同意</View>
        <View className="m-info">《艾尔森用户服务协议》</View>
      </View>
    </View>
  )
}

export default observer(Launch);