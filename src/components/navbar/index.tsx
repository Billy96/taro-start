import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

type params = {
  title?: String
  fixed?: Boolean
}

const Navbar = ({ title = 'taro多端模版', fixed }: params) => {
  const [style, setStyle] = useState({});

  const navbarRef: any = useRef(null);

  useEffect(() => {
    setStyle({
      height: Taro['$navbarHeight'],
      position: fixed ? 'fixed' : 'static'
    })
    console.log('navbarHeight===', navbarRef.current.clientHeight)
    return () => {}
  }, [])

  return (
    <View 
      className="navbar flexbt flexcl"
      style={style} 
      ref={navbarRef}
    >
      <View></View>
      <View className="navbar__main">{title}</View>
    </View>
  )
}

export default Navbar;