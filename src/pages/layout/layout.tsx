import React, { useState, Fragment } from 'react';
import { View } from '@tarojs/components';
import './layout.scss';
import Tabbar from '@/components/tabbar';
import tabbarDataInit from './tabbar.config';
import cloneDeep from 'lodash/cloneDeep';
import Shell from './components/shell';

const Layout = () => {
  const [tabbarData, setTabBarData] = useState(tabbarDataInit);
  const [tabbarIndex, setTabBarIndex] = useState(0);

  const listenTabbar = (key) => {
    let _tabbarData = cloneDeep(tabbarData);
    _tabbarData.forEach((item, index) => {
      item.current = false;
      if (item.key === key) {
        item.current = true;
        if (tabbarIndex === index) return
        setTabBarIndex(index);
      }
    })
    setTabBarData(_tabbarData);
  }

  return (
    <Fragment>
      <View className="main">
        <View 
          className="main__view flexbt" 
          style={{
            width: `${tabbarData.length * 100}vw`,
            transform: `translateX(-${tabbarIndex * 100}vw)`
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