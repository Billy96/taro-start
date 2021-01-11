const Taro = require('@tarojs/taro');
const ajax = require('@/utils/ajax');

/** 
 * H5
*/
module.exports = function () {
  console.log('web-login')
  setTimeout(() => {
    Taro.reLaunch({
      url: '/pages/layout/layout'
    })
  }, 1000)
  return
  ajax.default({
    path: '',
    data: {}
  }).then(res => {
    setTimeout(() => {
      Taro.reLaunch({
        url: '/pages/layout/layout'
      })
    }, 1000)
  })
}