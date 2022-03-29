import { FC, useEffect } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Image, Picker, CommonEventFunction } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import * as dayjs from 'dayjs'
import ICON_RIGHT from '@/static/ico_right.png'
import ICON_ADDR from '@/static/ico_address.png'
import addrStore from '@/store/address'
import orderStore from '@/store/order'
import './index.less'

const OrderPay: FC = () => {
  const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');

  useEffect(() => {
    addrStore.setSelectedAddrIndex(0);
    orderStore.setHasAgree(false);
    orderStore.setSelectedDate(tomorrow);
  }, [])

  useDidShow(() => {
    if (!addrStore.addrList?.length) {
      // 首次进页面栈，运行时机在 useEffect 前
      addrStore.getAddrList();
    }
  })

  const handleDateChange: CommonEventFunction = (e) => {
    const { value } = e.detail;
    if (value < tomorrow) {
      Taro.showToast({
        icon: 'none',
        title: '至少需要提前一天'
      })
    } else {
      orderStore.setSelectedDate(value);
    }
  }

  const goToAddrList = () => {
    Taro.navigateTo({ url: '/pages/his_addr/index' });
  }

  const goToAgreement = () => {
    Taro.navigateTo({ url: '/pages/agreement/index' });
  }

  const handlePay = () => {
    orderStore.payForService(addrStore?.selectedAddress?.id);
  }

  return (
    <View className='g-bd g-order-pay'>
      <view className='m-card addr' onClick={goToAddrList}>
        {
          addrStore?.selectedAddress?.name ? (
            <view>
              <view className='flex-column-center f-bold'>
                <Image className='icon-18' src={ICON_ADDR}></Image>
                <view className='ml-8'>{addrStore?.selectedAddress?.name}</view>
                <view className='ml-8'>{addrStore?.selectedAddress?.phone}</view>
              </view>
              <view className='f-14 f-gray9 ml-26'>{addrStore?.selectedAddress?.addr}</view>
            </view>
          ) :
            <view className='flex-column-center'>
              <Image className='icon-18' src={ICON_ADDR}></Image>
              <view className='f-14 f-gray9 ml-8'>请选择收件人信息</view>
            </view>
        }
        <Image className='icon-16' src={ICON_RIGHT}></Image>
      </view>
      <view className='m-card flex-column-center'>
        <view className='m-key mr-8'>{orderStore.selectedService?.type}</view>
        <view className='flex-1'>
          <view className='f-bold'>{orderStore.selectedService?.name}</view>
          <view className='flex-row-space-bet f-14 f-number'>
            <text className='f-gray7'>{orderStore.selectedService?.spec}</text>
            <text className='f-red'>¥ {orderStore.selectedService?.price}</text>
          </view>
        </view>
      </view>
      <view className='m-card'>
        <View className="flex-row-space-bet">
          <Text className='f-bold'>预约时间</Text>
          <view className='flex-column-center'>
            <Picker mode='date' onChange={handleDateChange} value={orderStore.selectedDate}>
              <View className={orderStore.selectedDate ? 'f-black' : 'f-gray7'}>
                {orderStore.selectedDate || '请选择日期'}
              </View>
            </Picker>
            <Image className='icon-16' src={ICON_RIGHT}></Image>
          </view>
        </View>
        <view className="f-14 f-gray9 mt-8">说明：预约空气检测治理至少须提前一天</view>
      </view>
      <View className="m-footer safe-area-bottom">
        <View className="info">
          <view className='flex-column-center'>
            <view
              className={`icon icon-circle ${orderStore.hasAgree ? 'selected-green' : ''}`}
              onClick={() => orderStore.reverseHasAgree()}
            ></view>
            <view className='ml-4'>
              本人知晓并同意
              <text className='f-blue' onClick={goToAgreement}>《用户预约协议》</text>
            </view>
          </view>
          <view>服务热线：4000-253-123</view>
        </View>
        <view className='flex'>
          <View className="left">
            <Text className="await-pay">合计： </Text>
            <Text className="amount-money">¥ {orderStore.selectedService?.price}</Text>
          </View>
          <View className="right">
            <AtButton
              className="button"
              circle
              type="primary"
              onClick={handlePay}
              disabled={!(orderStore.hasAgree && orderStore.selectedService?.price && Boolean(addrStore?.selectedAddress?.id))}
            >
              立即支付
            </AtButton>
          </View>
        </view>
      </View>
    </View>
  )
}

export default observer(OrderPay);