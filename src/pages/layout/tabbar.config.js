import React from 'react';
import Home from '../home/home';
import Test from '../test/test';
import User from '../user/user';
import { 
  home,
  homeActive,
  user,
  userActive
} from '@/assets/image';

const { color, selectedColor, current } = {
  color: '#969DAA',
  selectedColor: '#333'
};

/**
 * @param {
 *  current: 当前显示的tabbar页面
 *  load: 控制tabbar页面首次加载后就不加载，配合<Perload />使用
 *  key: 必须和component上的key保持一致
 * }
 * 从其他路口进入指定tabbar页面的话需设置目标页面的current和load都为true，非目标页面都为false，并且layout中的tabBarIndex属性设置为目标页面在下面数组中的index
 */
export default [
  {
    name: '首页',
    key: 'home',
    iconPath: home,
    selectedIconPath: homeActive,
    color,
    selectedColor,
    current: false,
    component: <Home key="home" />,
    load: false
  },
  {
    name: '测试',
    key: 'test',
    iconPath: home,
    selectedIconPath: homeActive,
    color,
    selectedColor,
    current: true,
    component: <Test key="test" />,
    load: true
  },
  {
    name: '我的',
    key: 'user',
    iconPath: user,
    selectedIconPath: userActive,
    color,
    selectedColor,
    current: false,
    component: <User key="user" />,
    load: false
  }
];