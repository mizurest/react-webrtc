import React, {useReducer, useState} from 'react';

import InputFormLocal from './InputFormLocal';
import InputFormRemote from './InputFormRemote';
import VideoGrid from './VideoGrid';
import RtcClient from '../utils/RtcClient';

const App = () => {
  const [rtcClient, _setRtcClient] = useState(new RtcClient());
  const [, forceRender] = useReducer( (boolean) => !boolean, false);

  //useState（値の更新）とuseReducer（再レンダリング）を両方行う関数
  const setRtcClient = () => {
    _setRtcClient(rtcClient);
    forceRender();
  }

  console.log(rtcClient)

  return (
    <>
      <InputFormLocal rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <InputFormRemote rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <VideoGrid rtcClient={rtcClient} />
    </>
  )
}

export default App;
