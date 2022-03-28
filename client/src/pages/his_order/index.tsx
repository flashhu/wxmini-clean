import { FC } from 'react'
import { observer } from 'mobx-react'
import { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import orderStore from '@/store/order'
import { SERVICE_MAP, PERSON_TYPES } from '@/constant/business'
import { fract } from '@/utils/utils'
import './index.less'

const HisOrder: FC = () => {
  useDidShow(() => {
    orderStore.getOrderList();
  })

  return (
    <View className='g-order_his'>
      {/* <View className="m-tl">您的订购记录</View> */}
      <View className="m-bd">
        {orderStore?.orderList?.map((item, i) =>
          <View className="m-row">
            <View className="m-hd">
              <View className="m-item m-id">{i + 1}.</View>
              <View className="m-item m-date">{item?.create_date}</View>
              <View className="m-item m-money">
                <Text className="m-i">{parseInt(item?.sum_price)}</Text>.
                <Text className="m-f">{fract(item?.sum_price)}</Text>
              </View>
            </View>
            <View className="m-service">
              <View className="m-info">
                <Text className="m-info-tl">服务名称</Text>
                <Text className="m-info-vl">{SERVICE_MAP[item?.type]}</Text>
              </View>
              {(['g', 'm'].includes(item?.type)) &&
                <>
                  <View className="m-info">
                    <Text className="m-info-tl">治理面积</Text>
                    <Text className="m-info-vl f-number">
                      {item?.area}
                      <Text className="m-d-u">m</Text>
                      <Text className="m-d-t">2</Text></Text>
                  </View>
                  <View className="m-info">
                    <Text className="m-info-tl">服务人员</Text>
                    <Text className="m-info-vl m-svr">{PERSON_TYPES[item?.tech_type || 0]}</Text>
                  </View>
                  <View className="m-info">
                    <Text className="m-info-tl">是否保险</Text>
                    <Text className="m-info-vl m-safe">{item?.is_insure ? '是' : '否'}</Text>
                  </View>
                </>}
              {(['s', 'c'].includes(item?.type)) &&
                <View className="m-info">
                  <Text className="m-info-tl">检测点数</Text>
                  <Text className="m-info-vl f-number">{item?.point}</Text>
                </View>
              }
            </View>
            <View className="m-detail">
              <View className="m-item">
                <Text className="m-item-tl">服务时间</Text>
                <Text className="m-item-ct">{item?.date}</Text>
              </View>
              <View className="m-item">
                <Text className="m-item-tl">客户姓名</Text>
                <Text className="m-item-ct">{item?.address?.name}</Text>
              </View>
              <View className="m-item">
                <Text className="m-item-tl">联系方式</Text>
                <Text className="m-item-ct">{item?.address?.phone}</Text>
              </View>
              <View className="m-item">
                <Text className="m-item-tl">服务地址</Text>
                <Text className="m-item-ct">{item?.address?.addr}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default observer(HisOrder);