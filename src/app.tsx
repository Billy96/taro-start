import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { Provider } from 'react-redux';
import configStore from './store';
import './app.scss';

const store = configStore();

class App extends Component {
  componentDidMount () {
    const { statusBarHeight } = Taro.getSystemInfoSync();
    Taro.$navbarHeight = `${(statusBarHeight || 0) + 44}px`;

    // 不同环境登录
    const env = Taro.getEnv();
    const login = require(`./utils/login/${env}.js`);
    login();
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App;
