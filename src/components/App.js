import React from 'react';

import VideoGrid from './VideoGrid';
import useRtcClient from './hooks/useRtcClient';
import InputForms from './InputForms';

const App = () => {
  const rtcClient = useRtcClient(); // 初期化されたものを取得

  console.log(rtcClient)
  return (
    <>
      <InputForms rtcClient={rtcClient} />
      <VideoGrid rtcClient={rtcClient} />
    </>
  )
}

export default App;
