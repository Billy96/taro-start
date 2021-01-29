import React, { useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import Navbar from '@/components/navbar';
import LazyImg from '@/components/lazyImg';
import ajax from '@/utils/ajax';
import cloneDeep from 'lodash/cloneDeep';
import './test.scss';

const Test = () => {
  const [data, setData] = useState({
    object: [],
    total_count: 0
  });
  let [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    console.log('load test')
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

  // 虚拟滚动相关
  const env = process.env.TARO_ENV;
  const itemHeight = 100; // 每项高度
  const itemRef:any = useRef([]);
  const setRef = (dom) => {
    itemRef.current.push(dom);
  }
  
  useEffect(() => {
    if (data.object.length > 0) {
      Taro.nextTick(() => {
        Taro.createSelectorQuery().select('.item')
          .boundingClientRect()
          .exec(() => {
            switch(env) {
              case 'weapp':
                intersectionObserverByWeapp()
                break;
              case 'h5':
                intersectionObserverByH5();
                break;
            }
          })
      })
    }
    return () => {}
  }, [data])

  // 微信小程序的监听者对象
  const intersectionObserverByWeapp = () => {
    console.log('还没写～～～')
  }

  // h5的监听者对象
  const intersectionObserverByH5 = () => {
    let intersectionObserver;
    intersectionObserver = new IntersectionObserver((entries) => {
      if (data.object.length > 0) {

        // 窗口可视数据条目数
        // const len = entries.filter(item => item.isIntersecting).length;
        // const len = 7;
        console.log('entries=', entries)
        entries.forEach(item => {
          const { target: { className }, isIntersecting } = item;
          const node = className.split(' ')[0];
          if (node === 'item' && isIntersecting) {
            intersectionObserver.unobserve(item.target);
          }
        })
      }
    });
    itemRef.current.forEach(item => {
      intersectionObserver.observe(item);
    })
  }

  return (
    <View className="tabbar-page">
      <Navbar title="测试" />
      <ScrollView
        className="list-test" 
        style={{
          height: `calc(100% - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight})`
        }} 
        scrollY 
        onScrollToLower={pageAdd}
      >
        {
          data.object.map((item: any, index) => 
            <View 
              id={`item-${index}`} 
              className="item" 
              style={{height: `${itemHeight}px`}} 
              key={`item-${index}`} 
              ref={setRef}
            >
              <LazyImg 
                url={item.image} 
                name={`img-${index}`}
                parentName="list-test"
              />
            </View>
          )
        }
      </ScrollView>
    </View>
  )
}

export default Test;