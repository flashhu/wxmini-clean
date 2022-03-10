import { FC } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

const Index: FC = () => {
  console.log('index');

  return (
    <View className='index'>
      <Text>shop!</Text>
    </View>
  )
}

export default Index;