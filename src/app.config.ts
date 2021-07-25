export default {
  pages: [
    'pages/landing/landing',
    'pages/home/index',
    'pages/chart/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'taro多端模版',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '#969DAA',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        text: '首页',
        iconPath: './assets/image/tabbar/home.png',
        selectedIconPath: './assets/image/tabbar/home-active.png',
        pagePath: 'pages/home/index',
      },
      {
        text: '图表',
        iconPath: './assets/image/tabbar/chart.png',
        selectedIconPath: './assets/image/tabbar/chart-active.png',
        pagePath: 'pages/chart/index',
      }
    ]
  }
}