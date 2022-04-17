import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";
import Home from './Pages/Home';
import { Success } from './Pages/Success';
import { Fail } from './Pages/Fail';
import { PicLive } from './Pages/PicLive';
import { VideoLive } from './Pages/VideoLive';
import Unauthorized from './Pages/Unauthorized';

//这里因为用了browserrouter，所以要加。如果用hashrouter就不用了。
//同时要和package.json中的homepage参数保持一致
import { Common } from './Common';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={Common.Home+"/"} element={<VideoLive></VideoLive>} />
          <Route path={Common.Home+"/success"} element={<Success></Success>} />
          <Route path={Common.Home+"/fail"} element={<Fail></Fail>} />
          <Route path={Common.Home+"/piclive"} element={<PicLive></PicLive>} />
          <Route path={Common.Home+"/videoLive"} element={<VideoLive></VideoLive>} />
          <Route path={Common.Home+"/unauthorized/:message"} element={<Unauthorized></Unauthorized>} />
          {/* <Route path="/pwa/exterior" element={withGoBack(<Exterior></Exterior>)} />
          <Route path="/pwa/inner" element={withGoBack(<Interior></Interior>)} />
          <Route path="/pwa/:key" element={<TileGroup></TileGroup>} />
          <Route path="/pwa/:key/detail" element={<TileDetail></TileDetail>} />
          <Route path="/pwa/calc/charge" element={<Charging></Charging>} />
          <Route path="/pwa/calc/range" element={<Range></Range>} /> */}
          {/* <Route path="/pwa/exterior" element={<Exterior></Exterior>} />
          <Route path="/pwa/interior" element={<Interior></Interior>} />
          <Route path="/pwa/exterior/:id" element={<TileGroup></TileGroup>} />
          <Route path="/pwa/interior/:id" element={<TileGroup></TileGroup>} /> */}
          {/* <Route path="/pwa/range" element={<Range></Range>} />
          <Route path="/pwa/charging" element={<Charging></Charging>} /> */}
          {/* <Route path="*" element={<Exterior></Exterior>} /> */}
        </Routes>
      </Router>
      {/* <p className='App-term'>—上海敏识网络科技有限公司提供技术支持—</p> */}
    </>


  );
}

export default App;
