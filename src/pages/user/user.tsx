import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView, View, Navigator } from '@tarojs/components';
import Navbar from '@/components/navbar';
import ajax from '@/utils/ajax';
import './user.scss';

const User = () => {
  useEffect(() => {
    console.log('load user')
    return () => {}
  }, [])

  return (
    <ScrollView scrollY style={{width: '100vw'}}>
      我的...
      <Navigator url="/pages/demo/exif/exif" style={{marginTop: '20px'}}>exif演示</Navigator>
    </ScrollView>
  )
}

export default User;