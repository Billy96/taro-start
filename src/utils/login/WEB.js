const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

/** 
 * H5
*/
module.exports = function (event) {
  console.log('web-login')
  setTimeout(() => {
    event();
    Taro.setStorageSync('userInfo', {
      nickName: '🌟🌟🌟',
      sex: '👨'
    });
    Taro.reLaunch({
      url: '/pages/layout/layout'
    })
  }, 1500)
  return
  ajax.default({
    path: '',
    data: {}
  }).then(res => {
    
  })
}