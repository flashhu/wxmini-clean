import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import orderStore from '@/store/order'
import './index.less'

const Order: FC = () => {
  const goToNextStep = (type: 's' | 'c' | 'g' | 'm') => {
    orderStore.setCurrType(type);
    switch (type) {
      case 's':
      case 'c':
        Taro.navigateTo({ url: '/pages/order_detect/index' });
        break;
      case 'g':
      case 'm':
        Taro.navigateTo({ url: '/pages/order_govern/index' })
        break;
      default:
        break;
    }
  }

  return (
    <View className='g-index'>
      <View className="m-head">立即预约</View>
      <View className="m-wrap">
        <View className="m-main m-main-up">
          <View className="m-main-c m-main-cl" onClick={() => { goToNextStep('s') }}>
            <Text className="m-res">溯源</Text>
            <Text className="m-res">检测</Text>
          </View>
          <View className="m-main-c m-main-cr" onClick={() => { goToNextStep('c') }}>
            <Text className="m-res">CMA</Text>
            <Text className="m-res">检测</Text>
          </View>
        </View>
        <View className="m-main m-main-l" onClick={() => { goToNextStep('g') }}>
          <Text className="m-res">国标</Text>
          <Text className="m-res">治理</Text>
        </View>
        <View className="m-main m-main-r" onClick={() => { goToNextStep('m') }}>
          <Text className="m-res">母婴</Text>
          <Text className="m-res">治理</Text>
        </View>
      </View>
      <View className="m-info">
        中科院博士生团队匠心打造治理产品，每平米价格低于
        <Text className="fn-red">15</Text>元
      </View>
      <View className="m-info">溯源治理，无效退款，十年质保</View>
      <View className="m-ft">
        <View className="m-ft-info">服务热线: <Text className="m-p">4000-253-123</Text></View>
      </View>
    </View>
  )
}

export default observer(Order);