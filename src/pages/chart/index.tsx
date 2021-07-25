import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import LineChart from '@/components/F2Charts/LineChart';
import "./index.scss";



export default () => {
  const data1 = [
    { y: 63.4, x: '2011-10-01' },
    { y: 62.7, x: '2011-10-02' },
    { y: 72.2, x: '2011-10-03' },
    { y: 58, x: '2011-10-04' },
    { y: 59.9, x: '2011-10-05' },
    { y: 67.7, x: '2011-10-06' },
    { y: 53.3, x: '2011-10-07' },
  ]

  useEffect(() => {

  }, [])

  return (
    <View>
      <LineChart data={data1} />
    </View>
  )
}