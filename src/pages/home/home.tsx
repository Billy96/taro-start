import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { ScrollView, View, Image, Text, Navigator } from '@tarojs/components';
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
  let [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    console.log('load home')
    getList(page > 1 ? false : true);
    return () => {}
  }, [page])

  const getList = (reload = true) => {
    ajax({
      path: '/Newofficial/searchObject', 
      data: {
        page, 
        perpage: pageSize
      }
    }).then(res => {
      if (!reload) {
        res.object = data.object.concat(res.object);
      }
      setData(res);
    })
  }

  const pageAdd = () => {
    if (page * pageSize >= data.total_count) return
    setPage(++page)
  }

  return (
    <ScrollView 
        className="scroll-view" 
        scrollY 
        onScrollToLower={pageAdd} 
      >
        {
          data.object.map((item: any) => 
            <Navigator 
              className="item" 
              key={item.auction_id} 
              url="/pages/detail/detail" 
            >
              <Image className="img" src={`${item.image}?x-oss-process=image/resize,w_200,h_200`} />
              <View className="flexst" style={{float: 'right'}}>
                <View>1234</View>
                <View>8888</View>
              </View>
              <Text>你好</Text>
            </Navigator>
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
  )
}

export default Home;