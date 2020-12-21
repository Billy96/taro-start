import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView, View, Image, Text } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import Navbar from '@/components/navbar';
import cloneDeep from 'lodash/cloneDeep';
import { throttle } from '@/utils/common';
import ajax from '@/utils/ajax';
import './home.scss';

const Home = () => {
  const [data, setData] = useState({
    object: [],
    total_count: 0
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('load home')
    getList();
    return () => {}
  }, [page])

  const getList = () => {
    ajax({
      path: '/Newofficial/searchObject', 
      data: {
        page, 
        perpage: 10
      }
    }).then(res => {
      if (data && data.object.length > 0) {
        const _data = cloneDeep(data);
        _data.object = _data.object.concat(res.object);
        _data.total_count = res.total_count;
        setData(_data);
      } else {
        setData(res);
      }
    })
  }

  const pageAdd = () => {
    let _page = page
    if (data.object.length >= data.total_count) return
    setPage(_page + 1)
  }

  return (
    <View className="tabbar-page">
      <Navbar title="首页" />
      <ScrollView 
        className="scroll-view" 
        style={{
          height: `calc(100% - ${Taro['$navbarHeight']})`
        }} 
        scrollY 
        onScrollToLower={pageAdd} 
      >
        {
          data.object.map((item: any) => 
            <View className="item" key={item.auction_id}>
              <Image className="img" src={`${item.image}?x-oss-process=image/resize,w_200,h_200`} />
              <View className="flexst" style={{float: 'right'}}>
                <View>1234</View>
                <View>8888</View>
              </View>
              <Text>你好</Text>
            </View>
          )
        }
        <AtLoadMore 
          status={
            data.object.length >= data.total_count ? 
            'noMore' : 
            'loading'
          } 
        />
      </ScrollView>
    </View>
  )
}

export default Home;