import {useEffect, useReducer, useState} from 'react';

import RtcClient from '../../utils/RtcClient'

const useRtcClient = () => {
    const [rtcClient, _setRtcClient] = useState(null);
    const [, forceRender] = useReducer( (boolean) => !boolean, false);
  
    //useState（値の更新）とuseReducer（再レンダリング）を両方行う関数
    const setRtcClient = (rtcClient) => {
      _setRtcClient(rtcClient);
      forceRender();
    }
  
    useEffect(() => {
      const client = new RtcClient(setRtcClient)
      client.setRtcClient();
    }, []);
  
    return rtcClient;
}

export default useRtcClient;