import React, { useState, memo } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import Navbar from '@/components/navbar';
import './virtualize.scss';
import VirtualList from '@tarojs/components/virtual-list';

const Row = memo(({ id, index, data }: any) => (
  <View id={id} className="v_item">
    Row {index} : {data[index]}
  </View>
));

const Virtualize = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData]:any = useState([]);
  const [page, setPage] = useState(0);

  const itemSize = 100;

  const pageAdd = () => {
    Taro.showLoading();
    setLoading(true);
    getListData(data.length);
  }

  const getListData = (offset = 0) => {
    setTimeout(() => {
      setPage(page + 1);
      setData(data.concat(Array(10).fill(0).map((_, i) => i + offset)));
      setLoading(false);
      Taro.hideLoading();
    }, 1000)
  }

  return (
    <VirtualList
      height={500} /* 列表的高度 */
      width='100vw' /* 列表的宽度 */
      itemData={data} /* 渲染列表的数据 */
      itemCount={data.length} /*  渲染列表的长度 */
      itemSize={itemSize} /* 列表单项的高度  */
      children={Row} /* 列表单项组件，这里只能传入一个组件  */
      onScroll={({ scrollDirection, scrollOffset }) => {
        if (
          !loading &&
          scrollDirection === 'forward' &&
          scrollOffset >= ((data.length - 5) * itemSize)
        ) {
          pageAdd();
        }
      }}
    />
  )
}

export default Virtualize;