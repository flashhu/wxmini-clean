import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import { useDidShow } from '@tarojs/taro'
import { AtFloatLayout, AtButton, AtTextarea } from "taro-ui"
import { View, Text, ScrollView } from '@tarojs/components'
import shopStore from '@/store/shop'
import { fract } from '@/utils/utils'
import './index.less'

// 1: 点赞 2: 点踩
const AGREE = 1;
const DISAGREE = 2;

const HisShopping: FC = () => {
  // 评论上拉框是否显示
  const [isOpened, setIsOpened] = useState(false);
  const [comment, setComment] = useState('');

  useDidShow(() => {
    shopStore.getGoodOrderList();
  })

  const handleClickComment = (index: number) => {
    setIsOpened(true);
    setComment('');
    shopStore.setCurrGoodList(index);
  }

  // 关闭上拉框
  const handleClose = () => {
    setIsOpened(false);
  }

  const handleChangeStatus = (index: number, action: number) => {
    const newVal = shopStore?.currGoodList[index]?.is_favor === action ? undefined : action;
    shopStore.setGoodComment(index, newVal);
  }

  const handleSubmit = () => {
    const list = shopStore?.currGoodList.filter(item =>
        item?.is_favor
      ).map((item) => ({
      good_id: item?.good_id,
      is_favor: item.is_favor as number
    }));
    shopStore.comment(comment, list);
    setIsOpened(false);
  }

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
            {order?.canComment &&
              <view className='m-action'>
              <view className='flex' onClick={() => handleClickComment(i)}>
                <view className='icon icon-edit'></view>
                <Text className='f-14 f-gray7 ml-4'>评价</Text>
              </view>
            </view>
            }
          </View>
        )}
      </View>
      <AtFloatLayout isOpened={isOpened} title='订单评价' onClose={handleClose}>
        <view className='m-comment safe-area-bottom-margin'>
          <view>
            <AtTextarea
              value={comment}
              onChange={(val) => { setComment(val) }}
              maxLength={100}
              height={75}
              placeholder='请输入评价'
            />
            <ScrollView scrollY scrollWithAnimation className='m-goods'>
              {
                shopStore?.currGoodList?.map((good, j) => (
                  <view className='flex-row-space-bet flex-column-center mt-16'>
                    <text className='f-black'>{good?.info?.name}</text>
                    <view className='flex'>
                      <view
                        className={`icon icon-agree ${shopStore?.currGoodList[j]?.is_favor === AGREE ? 'selected' : ''}`}
                        onClick={() => handleChangeStatus(j, AGREE)}
                      ></view>
                      <view
                        className={`icon icon-disagree ml-16 ${shopStore?.currGoodList[j]?.is_favor === DISAGREE ? 'selected' : ''}`}
                        onClick={() => handleChangeStatus(j, DISAGREE)}
                      ></view>
                    </view>
                  </view>
                ))
              }
            </ScrollView>
          </view>
          <AtButton
            className='m-btn'
            circle
            type='primary'
            disabled={!(comment || shopStore?.commentHasAgree)}
            onClick={handleSubmit}>
            提交
          </AtButton>
        </view>
      </AtFloatLayout>
    </View>
  )
}

export default observer(HisShopping);