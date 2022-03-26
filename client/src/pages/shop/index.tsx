import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import { IMG_SERVER } from '@/constant/apis';
import { fract } from '@/utils/utils'
import shopStore from '@/store/shop';
import './index.less'

const Shop: FC = () => {
  useShareAppMessage(res => ({
    title: '艾尔森净化',
    imageUrl: `${IMG_SERVER}/cdn/welogo.png`,
    path: '/pages/order/index'
  }));

  useDidShow(() => {
    shopStore.getGoodList();
  });

  const goToGoodDetail = (id: number) => {
    shopStore.setSelectedId(id);
    Taro.navigateTo({
      url: `/pages/shop_sp/index?id=${id}`
    })
  }

  return (
    <View className='shop'>
      <View className='shop__title'>
        <Text className='shop__title-txt'>推荐商品</Text>
      </View>
      <View className='shop__list'>
        {shopStore.list?.map((item) => (
          <View className='shop__list-item' onClick={() => { goToGoodDetail(item?.id) }} >
            <View className='shop__list-item-info'>
              <Swiper circular autoplay className='m-swiper'>
                <SwiperItem><Image className='shop__list-item-img' src={`${IMG_SERVER}/${item?.img_h1}`} /></SwiperItem>
                <SwiperItem><Image className='shop__list-item-img' src={`${IMG_SERVER}/${item?.img_h2}`} /></SwiperItem>
              </Swiper>
              <Text className='shop__list-item-desc'>
                {item?.name}
              </Text>
              <Text className='shop__list-item-name'>
                {item?.spec}/{item?.unit}
              </Text>
              <View className='shop__list-item-price-wrap'>
                <View className='shop__list-item-price'>
                  <Text className="m-i">{parseInt(item?.price)}</Text>.
                  <Text className="m-f">{fract(item?.price)}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      <View className='more'>
        <Text className='more-txt'>更多商品，敬请期待</Text>
      </View>
      <View className='fab'>
        <AtFab onClick={()=>Taro.navigateTo({url: '/pages/shop_cart/index'})}>
          <Text className='at-fab__icon at-icon at-icon-shopping-cart'></Text>
        </AtFab>
      </View>
    </View>
  )
}

export default observer(Shop);