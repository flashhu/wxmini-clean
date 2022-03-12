import { FC } from 'react'
import { observer } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import './index.less'

const Index: FC = () => {
  console.log('index');

  return (
    <View className='index'>
      <Text>his shopping!</Text>
    </View>
  )
}

export default observer(Index);