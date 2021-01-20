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

  const loadingRef = useRef(), itemRef = useRef([]);
  const itemHeight = 100; // 每项高度


  useEffect(() => {
    console.log('load test')
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
        _data.object.forEach((item: any, index) => {
          item.c_id = index + 1;
        })
        setData(_data);
      } else {
        res.object.forEach((item, index) => {
          item.c_id = index + 1;
        })
        setData(res);
      }
    })
  }

  const pageAdd = () => {
    let _page = page
    if (page * pageSize >= data.total_count) return
    setPage(++_page)
  }

  const setRef = (dom) => {
    // @ts-ignore
    itemRef.current.push(dom);
  }
  
  useEffect(() => {
    let intersectionObserver;
    if (process.env.TARO_ENV === 'h5') {
      intersectionObserver = new IntersectionObserver((entries) => {
        if (data.object.length > 0) {

          // 窗口可视数据条目数
          // const len = entries.filter(item => item.isIntersecting).length;
          const len = 7;

          entries.forEach(item => {
            const { target: { className }, isIntersecting } = item;
            const node = className.split(' ')[0];
            if (node === 'loading' && isIntersecting) {
              console.log('loading 出现')
              pageAdd()
            }
            if (node === 'item' && isIntersecting) {
              console.log('item', item.target.id.split('-')[1], item)
              item.target['style'] = "background: red";
              intersectionObserver.unobserve(item.target);
            }
          })
        }
      });
      intersectionObserver.observe(loadingRef.current);
      itemRef.current.forEach(item => {
        intersectionObserver.observe(item);
      })
    }
    return () => {}
  }, [data])

  

  return (
    <View className="tabbar-page">
      <Navbar title="测试" />
      <ScrollView
        className="list" 
        style={{
          height: `calc(100% - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight})`
        }} 
        scrollY 
      >
        {
          data.object.map((_, index) => 
            <View 
              id={`item-${index}`} 
              className="item" 
              style={{height: `${itemHeight}px`}} 
              key={`item-${index}`} 
              ref={setRef}
            >{index}</View>
          )
        }
        <View className="loading" ref={loadingRef}>加载中...</View>
      </ScrollView>
    </View>
  )
}

export default Test;