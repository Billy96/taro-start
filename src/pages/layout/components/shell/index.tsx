import React, { useState, useEffect, Fragment } from 'react';

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
    <Fragment>
      {
        load && dom
      }
    </Fragment>
  )
}