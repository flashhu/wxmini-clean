import { FC } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IMG_SERVER } from '@/constant/apis';
import caseStore from '@/store/case';
import { TEST_URL } from './config';
import './index.less'

const Case: FC = () => {
  useShareAppMessage(res => ({
      title: '艾尔森净化',
      imageUrl: `${IMG_SERVER}/cdn/welogo.png`,
      path: '/pages/order/index'
  }));

  useDidShow(() => {
    if(!caseStore?.list?.length) {
      caseStore.getCaseList();
    }
  });

  const goToArticle = (item) => {
    // if (item?.url) {
      Taro.navigateTo({ url: `/pages/webview/index?data=${encodeURIComponent(JSON.stringify({ url: TEST_URL }))}` })
    // }
  }

  return (
    <View className='g-case'>
      <View className="m-title">
        <Text className="m-li">艾尔森</Text>
        <Text className="m-li">专业空气治理品牌</Text>
        <Text className="m-li">百万家庭的共同选择</Text>
      </View>
      <View className="m-tl">艾尔森服务案例</View>
      <View className="m-case">
        {caseStore?.list?.map((item, i) =>
          <View className="m-item" key={i} onClick={() => goToArticle(item)}>
            <View className="m-head">
              <View className="m-name">{item?.name}</View>
            </View>
            <View className="m-pic">
              <Image src={`${IMG_SERVER}/${item?.img}`}></Image>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

export default observer(Case);