import React, { useState, useEffect, memo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';
import VirtualList from '@tarojs/components/virtual-list';
import ajax from '@/utils/ajax';

import './test.scss';

const Row = memo(({ index, style, data }: any) => {
  return (
    <View className="item" style={style}>
      {data[index]?.object_title}____{index+1}
    </View>
  );
})

const Test = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('load test')
    pageAdd();
    return () => {}
  }, [])

  const pageAdd = (reload = true) => {
    ajax({
      path: '/Newofficial/searchObject', 
      data: {
        page, 
        perpage: 10
      }
    }).then(res => {
      if (reload) {
        setData(res.object);
      } else {
        setTimeout(() => {
          setData(data.concat(res.object));
          setPage(page + 1);
        }, 1000)
      }
    })
  }

  const listenScroll = (scrollDirection, scrollOffset) => {
    if (scrollDirection === 'forward' && 
        scrollOffset >= ((data.length - 5) * 100)
    ) {
      pageAdd(false);
    }
  }

  return (
    <View className="tabbar-page">
      <Navbar title="虚拟滚动" />
      <View
        style={{
          height: `calc(100% - ${Taro['$navbarHeight']})`
        }} 
      >
        <VirtualList 
          height={500} // 列表的高度
          width='100%' // 列表的宽度
          itemData={data} // 渲染列表的数据
          itemCount={data.length} // 渲染列表的长度
          itemSize={100} // 列表单项的高度
          onScroll={({ scrollDirection, scrollOffset }) => listenScroll(scrollDirection, scrollOffset)}
        >
          {/* 列表单项组件，这里只能传入一个组件 */}
          {Row}
        </VirtualList>
      </View>
    </View>
  )
}

export default Test;