import { FC, useState } from 'react'
import { observer } from 'mobx-react'
import Taro, { useDidShow } from '@tarojs/taro'
import { AtFloatLayout, AtInput, AtButton, AtSwitch } from "taro-ui"
import { View, Text, ScrollView } from '@tarojs/components'
import addrStore from '@/store/address'
import './index.less'

const DEFAULT_INFO = {
  id: -1,
  name: '',
  phone: '',
  addr: '',
  is_default: false
};

const HisAddr: FC = () => {
  // 编辑地址上拉框是否显示
  const [isOpened, setIsOpened] = useState(false);
  const [info, setInfo] = useState(DEFAULT_INFO);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useDidShow(() => {
    addrStore.getAddrList();
  })

  const handleGetAddr = () => {
    Taro.chooseAddress({
      success: async (res) => {
        const info = {
          ...DEFAULT_INFO,
          name: res?.userName,
          phone: res?.telNumber,
          addr: `${res?.provinceName}${res?.cityName}${res?.countyName}${res?.detailInfo}`,
        }
        await addrStore.addAddr(info);
      }
    })
  }

  const handleDel = (id: number, index: number) => {
    Taro.showModal({
      content: '是否确认删除该地址？',
      success: async (res) => {
        if (res.confirm) {
          await addrStore.delAddr(id, index);
        }
      }
    })
  }

  // 点击修改，打开面板
  const handleClickUpdate = (index: number) => {
    setInfo(addrStore?.addrList?.[index])
    setSelectedIndex(index);
    setIsOpened(true);
  }

  // 更新对应地址
  const handleUpdate = async (params: Partial<typeof DEFAULT_INFO>, index: number) => {
    await addrStore.updateAddr(params, index);
  }

  // 点击新增地址
  const handleAdd = () => {
    setIsOpened(true);
  }

  // 关闭上拉框
  const handleClose = () => {
    setIsOpened(false);
  }

  const handleSubmit = async () => {
    if (info?.id === -1) {
      // 新增
      await addrStore.addAddr(info);
    } else {
      // 修改
      await addrStore.updateAddr(info, selectedIndex);
    }
    setIsOpened(false);
    setInfo(DEFAULT_INFO);
  }

  const handleSelect = (index: number) => {
    const pages = Taro.getCurrentPages();
    const prevPage = pages[pages.length-2];
    if(prevPage?.route === 'pages/shop_buy/index') {
      addrStore.setSelectedAddrIndex(index);
      Taro.navigateBack();
    }
  }

  return (
    <View className='addr'>
      <ScrollView scrollY scrollWithAnimation className='addr-list'>
        {addrStore?.addrList?.map((item, index) => (
          <view className='item' key={item?.id} onClick={() => handleSelect(index)}>
            <view className='flex f-bold'>
              <view>{item?.name}</view>
              <view className='ml-8'>{item?.phone}</view>
            </view>
            <view className='f-14 f-gray9'>{item?.addr}</view>
            <view className='action' onClick={(e) => { e.stopPropagation() }}>
              <view className='flex-column-center flex-row-space-bet'>
                <view className='flex'>
                  <view
                    className={`icon icon-circle ${item?.is_default ? 'selected': ''}`}
                    onClick={() => handleUpdate({ id: item?.id, is_default: !item?.is_default }, index)}
                  ></view>
                  <Text className='f-14 f-gray9 ml-4'>{item?.is_default ? '': '设为'}默认收货地址</Text>
                </view>
                <view className='flex'>
                  <view className='flex'>
                    <view className='icon icon-edit'></view>
                    <Text className='f-14 f-gray9 ml-4' onClick={() => handleClickUpdate(index)}>修改</Text>
                  </view>
                  <view className='flex ml-8'>
                    <view className='icon icon-del'></view>
                    <Text className='f-14 f-gray9 ml-4' onClick={() => handleDel(item?.id, index)}>删除</Text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        ))}
      </ScrollView>
      <View className="buy_footer safe-area-bottom">
        <View className="comp-button" onClick={handleGetAddr}>
          获取地址
        </View>
        <View className="comp-button comp-button--primary" onClick={handleAdd}>
          新增地址
        </View>
      </View>
      <AtFloatLayout isOpened={isOpened} title={`${info.id !== -1 ? '修改': '新增'}地址`} onClose={handleClose}>
        <view className='popup-content safe-area-bottom-margin'>
          <view>
            <AtInput
              name='name'
              title='姓名'
              type='text'
              maxlength={20}
              placeholder='请输入收件人姓名'
              value={info.name}
              onChange={(val) => { setInfo({ ...info, name: String(val) }) }}
            />
            <AtInput
              name='phone'
              title='手机号'
              type='text'
              maxlength={11}
              placeholder='请输入收件人手机号'
              value={info.phone}
              onChange={(val) => { setInfo({ ...info, phone: String(val) }) }}
            />
            <AtInput
              name='addr'
              title='地址'
              type='text'
              maxlength={50}
              placeholder='请输入收件人地址'
              value={info.addr}
              onChange={(val) => { setInfo({ ...info, addr: String(val) }) }}
            />
            <AtSwitch
              title='设为默认地址'
              checked={info.is_default}
              onChange={(val) => { setInfo({ ...info, is_default: val }) }}
            />
          </view>
          <AtButton
            className='addr-btn'
            circle
            type='primary'
            disabled={!(info.name && info.phone && info.addr)}
            onClick={handleSubmit}>
            确认
          </AtButton>
        </view>
      </AtFloatLayout>
    </View>
  )
}

export default observer(HisAddr);