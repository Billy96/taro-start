import React, { Component } from 'react'
import PropTypes from 'prop-types'
import F2Canvas from './F2Canvas'
import F2 from '@antv/f2'
// import fixF2 from './fix_f2'
 
export default class LineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
 
  render() {
    const data = this.props.data
    const initChart = (config) => {
      // ⚠️ 别忘了这行
      // 为了兼容微信小程序，你需要通过这个命令为F2打补丁
      // fixF2(F2)
      const chart = new F2.Chart(
        Object.assign(config, {
          appendPadding: [10, 15, 10, 15],
          // 预留展示tooltip高度
          padding: [40, 'auto', 'auto'],
        })
      )
      chart.clear()
 
      // 装载数据
      chart.source(data, {
        x: {
          type: 'timeCat',
          mask: 'MM-DD',
        },
      })
 
      // 设置折线样式
      chart.line().position('x*y').color('#1876ff').shape('smooth')
 
      // 设置折线锚点样式
      chart.point().position('x*y').color('#1876ff').size(3)
 
      // 添加tooltip
      chart.tooltip({
        showCrosshairs: true,
        showTitle: true,
        background: {
          radius: 5,
          fill: '#0a0d24',
        },
        crosshairsStyle: {
          stroke: 'white',
          labelWidth: 2,
        },
        alwaysShow: true,
      })
 
      // 暂时固定样式，后续拓展
      chart.axis('y', {
        label: {
          fill: '#B6B5B8',
          fontSize: 12,
        },
      })
      chart.axis('x', {
        label: {
          fill: '#B6B5B8',
          fontSize: 12,
        },
      })
 
      chart.render()
      // 一定要返回chart实例哦
      return chart
    }
 
    return (
      <F2Canvas
        id='chart-id'
        style={{ width: '100%', height: '200px' }}
        onInit={initChart}
      />
    )
  }
}
 
LineChart.propTypes = {
  data: PropTypes.array,
}