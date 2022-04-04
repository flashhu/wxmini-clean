import { FC, useState } from 'react'
import { useDidShow, getCurrentInstance } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import './index.less'

const NewPage: FC = () => {
  const [url, setURL] = useState('');

  useDidShow(() => {
    const { data } = getCurrentInstance()?.router?.params || {};
    const params = JSON.parse(decodeURIComponent(data || ''));
    setURL(params?.url || '');
  })

  const handleMessage = () => {}

  return (
    <WebView src={url} onMessage={handleMessage} />
  )
}

export default NewPage;