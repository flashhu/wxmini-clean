import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import shopStore from '@/store/shop'
import addrStore from '@/store/address'
import { GoodItem } from '@/typings/good'
import ICON_RIGHT from '@/static/ico_right.png'
import ICON_ADDR from '@/static/ico_address.png'
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
    const { count } = getCurrentInstance()?.router?.params || {};
    if (count) {
      // 商品详情页直接下单
      setBuyList([{
        ...shopStore?.currGoodInfo,
        count: Number(count)
      } as GoodItem]);
      setSumPrice((Number(shopStore?.currGoodInfo?.price) || 0) * Number(count));
      shopStore.setIsFromCart(false);
    } else {
      // 购物车下单
      setBuyList(shopStore?.cartList || []);
      setSumPrice(shopStore?.cartSumCount);
      shopStore.setIsFromCart(true);
    }
  });

  const goToAddrList = () => {
    Taro.navigateTo({ url: '/pages/his_addr/index' });
  }

  const handlePay = () => {
    const list = buyList?.map((item) => ({
      good_id: item?.id,
      count: Number(item?.count),
      // 某件商品的总价
      sum_price: Number(item?.count) * Number(item?.price)
    }))
    const orderInfo = {
      address_id: addrStore?.selectedAddress?.id,
      // 订单总价
      sum_price: sumPrice,
      list
    }
    shopStore.payForGoods(orderInfo);
  }

  return (
    <View className='buy'>
      <view className='addr' onClick={goToAddrList}>
        <view className='flex-row-space-bet flex-column-center p-12'>
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
            disabled={!(buyList?.length && Boolean(addrStore?.selectedAddress?.id))}
          >
            立即支付
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default observer(ConfirmOrder);