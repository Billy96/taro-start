const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

/** 
 * 微信小程序
*/
module.exports = function () {
  console.log('weapp-login')
  Taro.login({
    success: function (res) {
      if (res.code) {
        setTimeout(() => {
          Taro.reLaunch({
            url: '/pages/layout/layout'
          })
        }, 1000)
        return
        ajax.default({
          path: '',
          data: {
            code: res.code
          }
        }).then(res => {
          Taro.reLaunch({
            url: '/pages/layout/layout'
          })
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}