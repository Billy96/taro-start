import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';

const Detail = () => {
  useEffect(() => {
    console.log('load detail')
    return () => {}
  }, [])

  return (
    <View className="tabbar-page">
      <Navbar title="详情" back />
      
    </View>
  )
}

export default Detail;