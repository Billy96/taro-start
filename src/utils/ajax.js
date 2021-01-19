import Taro from '@tarojs/taro';

const apiPath = 
  process.env.NODE_ENV === 'development' 
    ? 'http://api.faepai.com/index.php/Web' 
    : 'http://api.faepai.com/index.php/Web';

const ajax = ({ path, data, method = 'POST' }) => 
new Promise((resolve, reject) => {
  console.time(`请求${path}耗时：`)
  Taro.request({
    url: `${apiPath}${path}`,
    data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method,
    success: (res) => {
      console.timeEnd(`请求${path}耗时：`)
      if (res.data?.status === 200) {
        console.log('😄请求成功：', res.data.data)
        resolve(res.data.data);
      } else {
        console.log('😤请求失败：', res.data)
        Taro.showToast({
          title: `${res.data?.message}`,
          icon: 'none'
        })
      }
    },
    fail: (err) => {
      console.error('😵请求出错：', err)
      Taro.showToast({
        title: '请求失败，请检查网络。',
        icon: 'none'
      })
    }
  })
})

export default ajax;