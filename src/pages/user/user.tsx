import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import Navbar from '@/components/navbar';
import ajax from '@/utils/ajax';
import './user.scss';

const User = () => {
  useEffect(() => {
    console.log('load user')
    return () => {}
  }, [])

  return (
    <View className="tabbar-page">
      <Navbar title="我的" />
      <ScrollView 
        style={{
          height: `calc(100% - ${Taro['$navbarHeight']})`
        }} 
        scrollY
      >
        我的...
      </ScrollView>
    </View>
  )
}

export default User;