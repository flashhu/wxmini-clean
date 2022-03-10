import { FC } from 'react'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import userStore from '@/store/user';
import './index.less'

const Index: FC = () => {
  console.log('index');

  return (
    <View className='index'>
      <Text onClick={() => userStore.setUser('tom')}>{userStore.user}</Text>
    </View>
  )
}

export default observer(Index);