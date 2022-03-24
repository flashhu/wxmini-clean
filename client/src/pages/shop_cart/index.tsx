import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow } from '@tarojs/taro'
import { AtInputNumber, AtButton } from 'taro-ui'
import { View, Text, Image } from '@tarojs/components'
import shopStore from '@/store/shop';
import { IMG_SERVER } from '@/constant/apis';
import ICON_DEL from '@/static/ico_del_g.png';
import './index.less'

const ShopCart: FC = () => {
  useDidShow(() => {
    if (!shopStore?.cartList?.length) {
      shopStore.getCartList();
    }
  });

  return (
    <View className='cart'>
      <View className="cart_list">
        {
          shopStore?.cartList?.length ? shopStore?.cartList?.map((item, index) => (
            <View className="cart_item">
              <view className='cart_item_right_top' onClick={() => { shopStore.changeCartList(0, index) }}>
                <Image className="icon" src={ICON_DEL}></Image>
              </view>
              <View className="cart_item_left">
                <Image src={`${IMG_SERVER}/${item.img_h1}`}></Image>
              </View>
              <View className="cart_item_right">
                <Text className="cart_item_right_title">{item.name}</Text>
                <Text className="cart_item_right_spe">{item.spec}/{item.unit}</Text>
                <Text className="cart_item_right_price">单价 : ¥ {item.price}</Text>
                <View className="cart_item_right_buy-quantity">
                  <AtInputNumber
                    size="normal"
                    min={0}
                    max={99}
                    width={200}
                    value={item.count || 1}
                    type="number"
                    onChange={(val) => { shopStore.changeCartList(val, index) }}
                  />
                </View>
              </View>
            </View>
          )) : (
            <view className='f-gray7 flex-center h-100v'>
              购物车空空如也，快去逛逛吧～
            </view>
          )
        }
      </View>
      <View className="cart_footer safe-area-bottom">
        <View className="left">
          <Text className="await-pay">合计： </Text>
          <Text className="amount-money">¥ {shopStore?.cartSumCount}</Text>
        </View>
        <View className="right">
          <AtButton
            className="button"
            circle
            type="primary"
            disabled={shopStore?.cartList?.length === 0}
            onClick={() => { Taro.navigateTo({ url: '/pages/shop_buy/index' })}}
          >
            去结算
          </AtButton>
        </View>
      </View>
    </View>
  )
}

export default observer(ShopCart);