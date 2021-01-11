import React, { useEffect } from 'react';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';

const User = () => {
  useEffect(() => {
    console.log('load detail')
    return () => {}
  }, [])

  return (
    <View className="tabbar-page">
      <Navbar title="详情" back />
      123
    </View>
  )
}

export default User;