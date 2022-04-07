import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow, useShareAppMessage, getCurrentInstance, useDidHide } from '@tarojs/taro'
import { Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber, AtTabs, AtTabsPane } from 'taro-ui'
import { View, Text, Image, Button } from '@tarojs/components'
import { IMG_SERVER } from '@/constant/apis';
import shopStore from '@/store/shop';
import useCheckLogin from '@/hooks/useCheckLogin';
import { TAB_LIST } from './config';
import './index.less'

const GoodDetail: FC = () => {
  // 是否打开下拉框
  const [isOpened, setIsOpened] = useState(false);
  // 商品数量
  const [count, setCount] = useState(1);
  // 操作类型
  const [isCart, setIsCart] = useState(true);
  // 当前 tab 索引
  const [tabIndex, setTabIndex] = useState(0);
  const { img_h1, img_h2, img_bd, name, spec, price, unit } = shopStore?.currGoodInfo ?? {};
  const { sales, appraise, comments } = shopStore?.selectedGoodDetail ?? {};

  useCheckLogin();

  useShareAppMessage(res => ({
    title: '艾尔森净化',
    imageUrl: `${IMG_SERVER}/cdn/welogo.png`,
    path: '/pages/order/index'
  }));

  useDidShow(() => {
    const { id } = getCurrentInstance()?.router?.params || {};
    shopStore.getGoodInfo(Number(id));
  });

  const handleAddCart = () => {
    setIsOpened(true);
    setIsCart(true);
  }

  const handleBuy = () => {
    setIsOpened(true);
    setIsCart(false);
  }

  const handleClose = () => {
    setIsOpened(false);
    setCount(1);
  }

  const handleConfirm = () => {
    if (isCart) {
      shopStore.addGoodToCart(count);
      Taro.showToast({
        title: '添加成功'
      });
    } else {
      // 下单
      Taro.navigateTo({ url: `/pages/shop_buy/index?count=${count}` });
    }
    setIsOpened(false);
    setCount(1);
  }

  return (
    <View className='goods'>
      <ScrollView scrollY>
        <Swiper
          className='goods-swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
        >
          <SwiperItem>
            <Image className='img' src={`${IMG_SERVER}/${img_h1}`} />
          </SwiperItem>
          <SwiperItem>
            <Image className='img' src={`${IMG_SERVER}/${img_h2}`} />
          </SwiperItem>
        </Swiper>
        <View className='goods_top'>
          <View className='goods_price f-bold'>￥{price}</View>
        </View>
        <View className='goods_top'>
          <View className='goods_name'>{name}</View>
        </View>
        <View className='goods_top'>
          <View className='goods_desc'>{spec}/{unit}</View>
          <View className='goods_desc'>销量 {sales}</View>
        </View>
        <view className='safe-area-bottom-margin'>
          <AtTabs current={tabIndex} tabList={TAB_LIST} onClick={(val) => setTabIndex(val)}>
            <AtTabsPane current={tabIndex} index={0} >
              <Image mode='widthFix' className='detail' src={`${IMG_SERVER}/${img_bd}`} />
            </AtTabsPane>
            <AtTabsPane current={tabIndex} index={1}>
              <view className='m-comment'>
                <view className='flex-column-center'>
                  <view className='m-tag'>
                    <view className='icon icon-agree'></view>
                    <text className='ml-8 f-gray7'>{appraise?.agree || 0}</text>
                  </view>
                  <view className='m-tag'>
                    <view className='icon icon-disagree'></view>
                    <text className='ml-8 f-gray7'>{appraise?.disagree || 0}</text>
                  </view>
                </view>
                {
                  comments?.length ?
                  comments?.map((item) => (
                    <view className='m-item' key={item?.id}>
                      <view className='f-black'>{item?.comment}</view>
                      <view className='f-gray9 f-14 mt-4'>{item?.date}</view>
                    </view>
                  )): (
                    <view className='flex-center f-gray9 mt-16'>
                      暂时没有评论...
                    </view>
                  )
                }
              </view>
            </AtTabsPane>
          </AtTabs>
        </view>
      </ScrollView>
      <View className='footer safe-area-bottom bg-white'>
        <View className='item-footer'>
          <View className='item-footer__nav' onClick={() => Taro.switchTab({ url: '/pages/order/index' })}>
            <Image className='item-footer__nav-img' src={require('../../static/icon_home.png')} />
          </View>
          <View className='item-footer__nav' onClick={() => Taro.navigateTo({ url: '/pages/shop_cart/index' })}>
            <Image className='item-footer__nav-img' src={require('../../static/icon_cart.png')} />
          </View>
          <AtFloatLayout isOpened={isOpened} title="请选择规格" onClose={handleClose}>
            <View className="popup-content safe-area-bottom-margin">
              <view>
                <view className="flex-column-base">
                  <Image className='img' src={`${IMG_SERVER}/${img_h1}`} />
                  <Text className='price f-16 ml-8 f-bold'>￥{price}</Text>
                </view>
                {/* TODO: 评论 */}
                <View className="flex-row-space-bet flex-column-center">
                  <Text className="f-black">购买数量</Text>
                  <AtInputNumber
                    min={1}
                    max={99}
                    step={1}
                    size='large'
                    value={count}
                    onChange={(val) => { setCount(val) }}
                    type={'number'}
                  />
                </View>
              </view>
              <Button className="comp-button comp-button comp-button--primary" onClick={handleConfirm}>确认</Button>
            </View>
          </AtFloatLayout>
          <Button className="comp-button comp-button--warn" onClick={handleAddCart}>
            <Text className="comp-button__txt comp-button__txt--primary">
              加入购物车
            </Text>
          </Button>
          <Button className="comp-button comp-button--primary" onClick={handleBuy}>
            <Text className="comp-button__txt comp-button__txt--primary">立即购买</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default observer(GoodDetail);