const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

module.exports = function () {
  console.log('weapp-login')
  Taro.login({
    success: function (res) {
      if (res.code) {
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