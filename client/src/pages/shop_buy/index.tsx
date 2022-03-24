import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import shopStore from '@/store/shop'
import addrStore from '@/store/address'
import { GoodItem } from '@/typings/good'
import ICON_RIGHT from '@/static/ico_right.png'
import { IMG_SERVER } from '@/constant/apis'
import './index.less'

const ConfirmOrder: FC = () => {
  const [buyList, setBuyList] = useState<GoodItem[]>([]);
  const [sumPrice, setSumPrice] = useState(0);

  useEffect(() => {
    addrStore.setSelectedAddrIndex(0);
  }, [])

  useDidShow(() => {
    if (!addrStore.addrList?.length) {
      // 首次进页面栈，运行时机在 useEffect 前
      addrStore.getAddrList();
    }
    const { count, addressIndex } = getCurrentInstance()?.router?.params || {};
    if (count) {
      // 商品详情页直接下单
      setBuyList([{
        ...shopStore?.currGoodInfo,
        count: Number(count)
      } as GoodItem]);
      setSumPrice((Number(shopStore?.currGoodInfo?.price) || 0) * Number(count));
    } else {
      // 购物车下单
      setBuyList(shopStore?.cartList || []);
      setSumPrice(shopStore?.cartSumCount);
    }
    if(addressIndex) {
      // 从地址列表页指定地址
      console.log('index', addressIndex)
    }
  });

  const goToAddrList = () => {
    Taro.navigateTo({ url: '/pages/his_addr/index' });
  }

  const handlePay = () => {
    console.log('pay');
  }

  return (
    <View className='buy'>
      <view className='addr' onClick={goToAddrList}>
        <view className='flex-row-space-bet flex-column-center p-12'>
          {
            addrStore?.selectedAddress?.name ? (
              <view>
                <view className='flex f-bold'>
                  <view>{addrStore?.selectedAddress?.name}</view>
                  <view className='ml-8'>{addrStore?.selectedAddress?.phone}</view>
                </view>
                <view className='f-14 f-gray9'>{addrStore?.selectedAddress?.addr}</view>
              </view>
            ) :
              <view className='f-14 f-gray9'>请选择收件人信息</view>
          }
          <Image className='addr-icon' src={ICON_RIGHT}></Image>
        </view>
        <view className='addr-border mt-8'></view>
      </view>
      <View className="buy_list">
        {
          buyList?.length ? buyList?.map((item, index) => (
            <View className="buy_item" key={index}>
              <View className="buy_item_left">
                <Image src={`${IMG_SERVER}/${item.img_h1}`} />
              </View>
              <View className="buy_item_right">
                <Text className="buy_item_right_title">{item.name}</Text>
                <Text className="buy_item_right_spe">{item.spec}/{item.unit}</Text>
                <Text className="buy_item_right_price">单价 : ¥ {item.price} x {item.count}</Text>
              </View>
            </View>
          )) : null
        }
      </View>
      <View className="buy_footer safe-area-bottom">
        <View className="left">
          <Text className="await-pay">合计： </Text>
          <Text className="amount-money">¥ {sumPrice}</Text>
        </View>
        <View className="right">
          <AtButton
            className="button"
            circle
            type="primary"
            onClick={handlePay}
            disabled={buyList?.length === 0}
          >
            立即支付
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default observer(ConfirmOrder);