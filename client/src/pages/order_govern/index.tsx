import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro from '@tarojs/taro'
import { AtInput } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import { Menus, TechType } from './config'
import orderStore from '@/store/order'
import useCheckLogin from '@/hooks/useCheckLogin'
import './index.less'

const OrderGovern: FC = () => {
  useCheckLogin();

  const handleChangeType = (t: 'g' | 'm') => {
    orderStore.setCurrType(t);
    orderStore.resetGovern();
  }

  const handleAreaChange = (val: string) => {
    const num = Number(val);
    orderStore.setArea(isNaN(num) ? 0 : num);
  }

  const goToNextStep = () => {
    Taro.navigateTo({ url: '/pages/order_pay/index' });
  }

  return (
    <View className='g-bd g-govern'>
      <view className="m-type">
        {Menus.map((item) => (
          <view
            className={`m-tl ${orderStore.currType === item?.key ? 'active' : ''}`}
            onClick={() => handleChangeType(item.key as ('g' | 'm'))}
          >{item.name}</view>
        ))}
      </view>
      <View className="m-step m-step1">
        <View className="m-tl">1. 室内面积</View>
        <View className="m-bd">
          <AtInput
            className='m-val'
            type='number'
            name='area'
            value={String(orderStore.area || '')}
            maxlength={5}
            focus
            onChange={handleAreaChange}
          />
          <Text>m</Text>
          <Text className="m-up">2</Text>
        </View>
      </View>
      {(orderStore.area !== 0) &&
        <View className="m-result">
          <View className="m-wrap">
            <View className="m-tl">产品价格</View>
            <View className="m-bd">
              <View className="m-price">{orderStore.governCost?.good || 0}</View>
              <Text className="m-unit">元</Text>
            </View>
          </View>
          <View className="m-wrap">
            <Text className="m-info">(预计使用甲醛净、除味剂产品的价格)</Text>
          </View>
        </View>}
      {(orderStore.area !== 0) &&
        <View className="m-step m-step2">
          <Text className="m-tl">2. 技术服务人员</Text>
          <View className="m-sel">
            {TechType.map((item) => (
              <View
                className={(item.key === orderStore.techType) ? "m-group sel" : "m-group"}
                onClick={() => orderStore.setTechType(item.key as (0 | 1))}
              >
                <View className="m-item">{item.name}</View>
              </View>
            ))}
          </View>
          <View className="m-wrap">
            <View className="m-tl">治理价格：</View>
            <View className="m-bd">{orderStore.governCost?.tech}</View>
            <Text className="m-unit">元</Text>
          </View>
          <View className="m-wrap">
            <View className="m-tl">治理时长：</View>
            <View className="m-bd">{orderStore.governCost?.time}</View>
            <Text className="m-unit">小时</Text>
          </View>
          <Text className="m-info">此价格包含2次检测及保质期内的多次复检</Text>
        </View>}
      {(orderStore.area !== 0) &&
        <View className="m-step m-step3">
          <View className="m-main">
            <Text className="m-tl">3. 是否需要保险 <Text className=" m-red">(3%)</Text></Text>
            <View className={(orderStore.hasInsure) ? "m-chk sel" : "m-chk"} onClick={() => orderStore.reverseHasInsure()}>
              是
            </View>
          </View>
          <Text className="m-info">华泰保险承保，合同金额的3%，损坏家具照价赔偿</Text>
          <View className="m-wrap">
            <View className="m-tl">保险价格：</View>
            <View className="m-bd">{orderStore.governCost?.insure}</View>
            <Text className="m-unit">元</Text>
          </View>
        </View>}
      {(orderStore.area !== 0) &&
        <View className="m-result">
          <View className="m-wrap">
            <Text className="m-tl">总计金额</Text>
            <View className="m-bd">
              <Text className="m-price">{orderStore.governCost?.all}</Text>
              <Text className="m-unit">元</Text>
            </View>
          </View>
        </View>}
      {(orderStore.area !== 0) &&
        <View className="fn-btn-sb circle" onClick={goToNextStep}>下一步</View>}
    </View>
  )
}

export default observer(OrderGovern);