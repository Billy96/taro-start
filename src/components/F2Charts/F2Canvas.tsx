import React, { useState } from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { Canvas } from '@tarojs/components';

/**
 * 封装canvas兼容F2
 * 
 * */ 
 
interface Config {
  context: CanvasRenderingContext2D
  width: number
  height: number
  pixelRatio: number
}
 
export type F2CanvasProps = {
  id: string
  className?: string
  style: string
  onInit: (conifg: Config) => any
}
 
function wrapEvent(e: any) {
  if (!e) return
  if (!e.preventDefault) {
    e.preventDefault = function () {}
  }
  return e
}

export default ({ id, className, style, onInit }: F2CanvasProps) => {
  const [canvasEl, setCanvasEl]: any = useState(null);
  const [chart, setChart]: any = useState(null);

  useReady(() => {
    const query = Taro.createSelectorQuery();
      
    query
    .select(`#${id}`)
    .fields({
      node: true,
      size: true,
    })
    .exec((res) => {
      const { node, width, height } = res[0];
      const context = node.getContext('2d');
      const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
      // 高清设置
      node.width = width * pixelRatio;
      node.height = height * pixelRatio;
      //  chart全局设置
      const appendPadding = 5;
      const config = { context, width, height, pixelRatio, appendPadding };

      const _chart = onInit(config);
      if (_chart) {
        setCanvasEl(_chart.get('el'));
        setChart(_chart);
      }
    })
  })

  const touchStart = (e: { preventDefault: () => void }) => {
    if (canvasEl) {
      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
    }
  }
 
  const touchMove = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (canvasEl) {
      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
    }
  }
 
  const touchEnd = (e: { preventDefault: () => void }) => {
    if (canvasEl) {
      canvasEl.dispatchEvent('touchend', wrapEvent(e));
    }
  }

  return (
    <Canvas
      className={className}
      style={style}
      type="2d"
      id={id}
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
    />
  )
}