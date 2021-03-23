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

  return (
    <ScrollView
      className="list-test" 
      scrollY 
      onScrollToLower={pageAdd}
    >
      {
        data.object.map((item: any, index) => 
          <View 
            id={`item-${index}`} 
            className="item" 
            style={{height: `100px`}} 
            key={`item-${index}`} 
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
  )
}

export default Test;