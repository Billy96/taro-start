import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, ScrollView } from '@tarojs/components';
import Navbar from '@/components/navbar';
import { EChart } from "echarts-taro3-react";
import "./chart.scss";

const Chart = () => {
  const defautOption = {
    title: {
      text: '哈哈哈哈'
    },
    legend: {
      height: 1000
    },
    grid: {
      height: 'auto'
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(220, 220, 220, 0.8)",
        },
      },
    ],
  };
  const barChartRef = useRef();

  useEffect(() => {
    // @ts-ignore
    barChartRef.current.refresh(defautOption);
  }, [])

  return (
    <View className="tabbar-page">
      <Navbar title="图表" />
      <ScrollView 
        style={{
          height: `calc(100% - ${Taro.$navbarHeight} - ${Taro.$safeAreaHeight})`
        }} 
        scrollY 
      >
        {/* @ts-ignore */}
        <EChart ref={barChartRef} canvasId="bar-canvas" />
      </ScrollView>
    </View>
  )
}

export default Chart;