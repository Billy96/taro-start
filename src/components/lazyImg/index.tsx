import React, { useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

interface params {
  url: String
  name: any
}

const LazyImg = ({ url, name }: params) => {
  const imgRef = useRef();

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery().select('.img')
        .boundingClientRect()
        .exec(() => {
          switch(process.env.TARO_ENV) {
            case 'weapp':
              intersectionObserverByWeapp()
              break;
            case 'h5':
              intersectionObserverByH5();
              break;
          }
        })
    })
    return () => {};
  }, [])

  // 微信小程序的监听者对象
  const intersectionObserverByWeapp = () => {
    const page = Taro.getCurrentPages()[0];
    let intersectionObserver = Taro.createIntersectionObserver(page);
    /**
     * .list必须是独有的类名，且必须是变量
     * */ 
    intersectionObserver.relativeTo('.list').observe(`.${name}`, (entries) => {
      if (entries.intersectionRatio > 0 && url) {
        console.log(11111)
        /**
         * 写懒加载的样式
         * */ 
        intersectionObserver.disconnect();
      }
    });
  }

  // h5的监听者对象
  const intersectionObserverByH5 = () => {
    let intersectionObserver;
    intersectionObserver = new IntersectionObserver((entries) => {
      const item = entries[0];
      const { isIntersecting } = item;
      if (isIntersecting && url) {
        item.target['style'] = `background: url(${url}) no-repeat;background-size: 100% 100%;`;
        intersectionObserver.unobserve(item.target);
      }
    })
    intersectionObserver.observe(imgRef.current);
  }

  return (
    <View className={`img ${name}`} ref={imgRef} />
  )
}

export default LazyImg;