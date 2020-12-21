import Taro from '@tarojs/taro';

const apiPath = 
  process.env.NODE_ENV === 'development' 
    ? 'http://api.faepai.com/index.php/Web' 
    : '';

const ajax = ({ path, data, method = 'POST' }) => 
new Promise((resolve, reject) => {
  Taro.request({
    url: `${apiPath}${path}`,
    data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method,
    success: (res) => {
      if (res.data.status === 200) {
        resolve(res.data.data);
      } else {
        Taro.showToast({
          title: `${res.data.message}`,
          icon: 'none'
        })
        reject(`——————  ${res.data.status}：${res.data.message} ——————`)
      }
    },
    fail: () => {
      Taro.showToast({
        title: '请求失败，请检查网络。',
        icon: 'none'
      })
    }
  })
})

export default ajax;