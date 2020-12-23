import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Button, Image } from '@tarojs/components';
import Navbar from '@/components/navbar';
const exif = require('@/utils/exif')

const Exif = () => {
  const [imgPath, setImgPath] = useState('');
  const [imgInfo, setImgInfo] = useState({});

  const take = () => {
    Taro.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        setImgPath(res.tempFilePaths[0]);

        Taro.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0],
          success: (file: any) => {
            console.log(exif.pretty(file.data))
            setImgInfo(exif.pretty(file.data));
          }
        })
        
      }
    })
  }

  return (
    <View>
      <Navbar title="exif演示" />
      <Button onClick={take}>点击拍照</Button>
      <Image src={imgPath} id="img" />
      <View>
        info: 
        {
          JSON.stringify(imgInfo)
        }
      </View>
    </View>
  )
}

export default Exif;