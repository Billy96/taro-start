import React from 'react';
import Home from './pages/home/home';
import Test from './pages/test/test';
import Virtualize from './pages/virtualize/virtualize';
import Chart from './pages/chart/chart';
import User from './pages/user/user';
import { tabbarColor, tabbarSelectedColor } from './assets/css/var.scss';
import { 
  home,
  homeActive,
  test,
  testActive,
  virtualize,
  virtualizeActive,
  chart,
  chartActive,
  user,
  userActive
} from '@/assets/image';

const { color, selectedColor, current } = {
  color: tabbarColor,
  selectedColor: tabbarSelectedColor
};

/**
 * @param { current: 当前显示的tabbar页面 }
 * @param { key: 必须和component上的key保持一致 }
 * @param { tabBarIndex 和 current一起设置从其他路口进入指定tabbar页面 }
 * tabBarIndex在 layout
 */
export default [
  {
    name: '首页',
    key: 'home',
    iconPath: home,
    selectedIconPath: homeActive,
    color,
    selectedColor,
    current: true,
    component: <Home key="home" />,
  },
  {
    name: '测试',
    key: 'test',
    iconPath: test,
    selectedIconPath: testActive,
    color,
    selectedColor,
    current: false,
    component: <Test key="test" />,
  },
  {
    name: '虚拟滚动',
    key: 'virtualize',
    iconPath: virtualize,
    selectedIconPath: virtualizeActive,
    color,
    selectedColor,
    current: false,
    component: <Virtualize key="virtualize" />,
  },
  {
    name: '图表',
    key: 'chart',
    iconPath: chart,
    selectedIconPath: chartActive,
    color,
    selectedColor,
    current: false,
    component: <Chart key="chart" />,
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
  }
];