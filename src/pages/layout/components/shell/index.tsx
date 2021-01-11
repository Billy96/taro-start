import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components';

type domVal = {
  key: String | Number | null
}

type dataVal = {
  key: String
  current: Boolean
  load: Boolean
}

type params = {
  dom: domVal
  data: Array<dataVal>
}

export default ({ dom, data }: params) => {
  const [load, setLoad] = useState(false); 

  useEffect(() => {
    console.log(`========== load ${dom.key} shell ==========`)
    data.forEach(item => {
      if (item.key === dom.key) {
        if (item.current || item.load) {
          setLoad(true);
        }
      }
    })
    return () => {}
  }, [data])

  return (
    <View style={{width: '100vw'}}>
      {
        load && dom
      }
    </View>
  )
}