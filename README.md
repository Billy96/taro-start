本模版通过 translateX + Shell组件 + Prerender（预渲染） 解决tabbar完全自定义。

注意：由于tabbar页面所在的layout是通过预渲染加载的，在tabbar页面使用（VirtualList）虚拟滚动会报错，勿用！

本项目使用的是typescript，如果需要在Taro上写自定义属性请在根目录下的global.d.ts文件下声明。