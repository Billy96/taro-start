import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtActivityIndicator } from 'taro-ui';
import { connect } from 'react-redux';

/**
 * 落地页
*/ 
// @connect(({  }) => ({
  
// }))
const Landing = () => {
  useEffect(() => {
    // 不同环境登录
    const env = Taro.getEnv();
    const login = require(`@/utils/login/${env}.js`);
    login();
  })

  return (
    <AtActivityIndicator mode="center" content="正在启动应用，请稍后..." />
  )
}

export default Landing;