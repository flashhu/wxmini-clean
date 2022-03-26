import { FC } from 'react'
import { observer } from 'mobx-react'
import { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import shopStore from '@/store/shop'
import { fract } from '@/utils/utils'
import './index.less'

const HisShopping: FC = () => {
  useDidShow(() => {
    shopStore.getGoodOrderList();
  })

  return (
    <View className='g-order_shop'>
      {/* <View className="m-tl">您的订购记录</View> */}
      <View className="m-bd">
        {shopStore?.orderList.map((order, i) =>
          <View className="m-row" key={i}>
            <View className="m-hd">
              <View className="m-item m-id">{i + 1}.</View>
              <View className="m-item m-date">{order?.date}</View>
              <View className="m-item m-money">
                <Text className="m-i">{Math.trunc(order?.sum_price)}</Text>.
                <Text className="m-f">{fract(order?.sum_price)}</Text>
              </View>
            </View>
            <View className="m-goods">
              {order?.item?.map((good, j) =>
                <View className="m-good">
                  <View className="m-id">{j + 1}.</View>
                  <View className="m-name">{good?.info?.name}*{good?.count}</View>
                  <View className="m-pr">
                    <Text className="m-i">{parseInt(good?.info.price)}</Text>.
                    <Text className="m-f">{fract(good?.info.price)}</Text>
                  </View>
                </View>
              )}
            </View>
            <View className="m-detail">
              <View className="m-item">
                <Text className="m-item-tl">客户姓名</Text>
                <Text className="m-item-ct">{order?.address?.name}</Text>
              </View>
              <View className="m-item">
                <Text className="m-item-tl">联系方式</Text>
                <Text className="m-item-ct">{order?.address?.phone}</Text>
              </View>
              <View className="m-item">
                <Text className="m-item-tl">收货地址</Text>
                <Text className="m-item-ct">{order?.address?.addr}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default observer(HisShopping);