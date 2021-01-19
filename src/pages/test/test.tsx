import React, { useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import Navbar from '@/components/navbar';
import ajax from '@/utils/ajax';
import cloneDeep from 'lodash/cloneDeep';
import './test.scss';

const Test = () => {
  const [data, setData] = useState({
    object: [],
    total_count: 0
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const scrollRef = useRef();


  const itemHeight = 100; // 每项高度


  useEffect(() => {
    console.log('load test')
    console.log('scrollRef=', document.getElementById('scroll'))
    getList();
    return () => {}
  }, [page])

  const getList = () => {
    ajax({
      path: '/Newofficial/searchObject', 
      data: {
        page, 
        perpage: pageSize
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
    if (page * pageSize >= data.total_count) return
    setPage(++_page)
  }

  const listenScroll = (e) => {
    const top = e.detail.scrollTop, bottom = pageSize * itemHeight;
    
    
    // 触顶
    if (top === 0) {
      console.log('top')
    }
    // 触底
    if  (bottom === top) {
      console.log('bottom')
    }
  }

  return (
    <View className="tabbar-page">
      <Navbar title="测试" />
      <ScrollView
        id="scroll" 
        className="list" 
        style={{
          height: `calc(100% - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight})`
        }} 
        scrollY 
        onScroll={listenScroll} 
        onScrollToLower={pageAdd} 
        ref={scrollRef}
      >
        {
          data.object.map((_, index) => 
            <View style={{height: `${itemHeight}px`}}>{index}</View>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Test;