import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { AtActivityIndicator } from 'taro-ui';
import { connect } from 'react-redux';
import { setStatus } from '@/store/actions/options';

/**
 * 落地页
*/ 
const Landing = ({ _setStatus, options: { status } }) => {
  useEffect(() => {
    console.log('status==', status)
    // 不同环境登录
    const env = Taro.getEnv();
    const login = require(`@/utils/login/${env}.js`);
    login(initStore);
    return () => {}
  }, [])

  const initStore = () => {
    _setStatus([
      {label: '健康', value: 1},
      {label: '良好', value: 2},
      {label: '生病', value: 3},
    ]);
  }

  return (
    <AtActivityIndicator mode="center" content="正在启动应用，请稍后..." />
  )
}

const mapStateToProps = ({ options }) => ({
  options
});

const mapDispatchToProps = (dispatch) => ({
  _setStatus(data) {
    dispatch(setStatus(data))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);