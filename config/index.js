const path = require('path');

// 不同编译环境输出不同文件夹
let outputRoot = '';
switch (process.env.TARO_ENV) {
  case 'weapp':
    outputRoot = 'dist/weapp';
    break;
  case 'alipay':
    outputRoot = 'dist/alipay';
    break;
  case 'swan':
    outputRoot = 'dist/swan';
    break;
  case 'qq':
    outputRoot = 'dist/qq';
    break;
  case 'tt':
    outputRoot = 'dist/tt';
    break;
  case 'jd':
    outputRoot = 'dist/jd';
    break;
  case 'h5':
    outputRoot = 'dist/h5';
    break;
  case 'quickapp':
    outputRoot = 'dist/quickapp';
    break;
  case 'rn':
    outputRoot = 'dist/rn';
    break;
  default:
    outputRoot = 'dist';
}

const config = {
  projectName: 'taro-start',
  date: '2020-12-16',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot,
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    esnextModules: ['taro-ui'],
    router: {
      mode: 'browser'
    }
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets')
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
