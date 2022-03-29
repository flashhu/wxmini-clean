import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import orderStore from '@/store/order'
import { Menus } from './config'
import './index.less'

const OrderDetect: FC = () => {
  const handleChangeType = (t: 's' | 'c') => {
    orderStore.setCurrType(t);
    orderStore.setPoint(0);
  }

  const handlePointChange = (val: string) => {
    const num = Number(val);
    orderStore.setPoint(isNaN(num) ? 0 : num);
  }

  const goToNextStep = () => {
    Taro.navigateTo({ url: '/pages/order_pay/index' });
  }

  return (
    <View className='g-bd g-detect'>
      <view className="m-type">
        {Menus.map((item) => (
          <view
            className={`m-tl ${orderStore.currType === item?.key ? 'active' : ''}`}
            onClick={() => handleChangeType(item.key as ('s' | 'c'))}
          >{item.name}</view>
        ))}
      </view>
      <View className="m-step">
        <View className="m-head">
          <View className="m-tl">点位数量</View>
          <View className="m-bd">
            <AtInput
              className='m-val'
              type='number'
              name='point'
              value={String(orderStore.point || '')}
              maxlength={3}
              focus
              onChange={handlePointChange}
            />
            <Text>个</Text>
          </View>
        </View>
      </View>
      {(orderStore.point !== 0) &&
        <View className="m-result">
          <View className="m-wrap">
            <View className="m-tl">检测价格</View>
            <View className="m-bd">
              <View className="m-price">{orderStore.detectPrice}</View>
              <Text className="m-unit">元</Text>
            </View>
          </View>
        </View>}
      <View className="m-help">
        <View className="m-tl"> HELP: 如何选择检测种类</View>
        <View className="m-main">
          <View className="m-li" >1. 溯源检测: 检查甲醛的主要来源，由本公司提供服务。</View>
          <View className="m-li" >2. CMA检测: 由第三方CMA机构提供服务，检测报告具有法律效力，检测准确性有保障。</View>
        </View>
      </View>
      <View className="m-help">
        <View className="m-tl"> HELP: 如何计算点位数量</View>
        <View className="m-main">
          <View className="m-li" >1. 全部选点: 即按房间数量设置检测点，比如一室一厅就是2个点，三室一厅90平方左右就是4个点。</View>
          <View className="m-li" >2. 部分选点: 即按几个重点房间来设置检测点，比如选择小孩房和主卧就是2个点。</View>
          <View className="m-li" >3. 选择特例: 厨房和厕所不属于检测设点的对象。</View>
        </View>
      </View>
      {(orderStore.point !== 0) &&
        <View className="fn-btn-sb circle" onClick={goToNextStep}>下一步</View>}
    </View>
  )
}

export default observer(OrderDetect);