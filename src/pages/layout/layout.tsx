import React, { useState, Fragment } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './layout.scss';
import Navbar from '@/components/navbar';
import Tabbar from '@/components/tabbar';
import tabbarDataInit from '../../tabbar.config';
import cloneDeep from 'lodash/cloneDeep';
// @ts-ignore
import { tabbarHeight } from '@/assets/css/var.scss';
import Shell from './components/shell';

const Layout = () => {
  const [tabbarData, setTabBarData] = useState(tabbarDataInit);
  const [tabbarIndex, setTabBarIndex] = useState(0);

  const listenTabbar = (key) => {
    let _tabbarData = cloneDeep(tabbarData);
    let _index = 0;
    _tabbarData.forEach((item, index) => {
      item.current = false;
      if (item.key === key) {
        item.current = true;
        _index = index;
        if (tabbarIndex === index) return
        setTabBarIndex(index);
      }
    })
    if (tabbarIndex === _index) return
    setTabBarData(_tabbarData);
  }

  return (
    <Fragment>
      <Navbar />
      <View 
        className="main" 
        style={{
          height: `calc(100vh - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight} - ${tabbarHeight})`
        }}
      >
        <View 
          className="main__view flexst" 
          style={{
            width: `${tabbarData.length * 100}vw`,
            transform: `translateX(-${tabbarIndex * 200}vw)`
          }}
      >
          {
            tabbarData.map((item, index) => 
              <Shell 
                dom={item.component} 
                data={tabbarData} 
                key={index} 
              />
            )
          }
        </View>
      </View>
      <Tabbar 
        data={tabbarData} 
        onListenTabbar={listenTabbar} 
      />
    </Fragment>
  )
}

export default Layout;