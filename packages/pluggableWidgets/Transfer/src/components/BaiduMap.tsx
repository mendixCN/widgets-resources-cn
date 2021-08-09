import { Map, APILoader } from '@uiw/react-baidu-map';
import { createElement } from 'react';


export const BaiduMap = () => (
  <div style={{ width: '100%', height: '300px' }}>
    <APILoader akay="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f">
      <Map center="杭州"/>
    </APILoader>
  </div>
);