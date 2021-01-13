const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

/** 
 * 微信小程序
*/
module.exports = function (event) {
  console.log('weapp-login')
  Taro.login({
    success: function (res) {
      event();
      if (res.code) {
        setTimeout(() => {
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
          data: {
            code: res.code
          }
        }).then(res => {
          
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}