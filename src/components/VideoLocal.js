import React, { useRef, useEffect } from 'react';
import Video from './Video';

const VideoLocal = (props) => {
  const { rtcClient } = props
    const videoRef = useRef(null)
    const currentVideoRef = videoRef.current
    const mediaStream = rtcClient.mediaStream

    useEffect(() => {
      if(currentVideoRef === null) return
      const getMedia = () => {
        
        try {
          // MediaStreamを受け取ってRefに設定
          currentVideoRef.srcObject = mediaStream
        } catch(err) {
          console.error(err)
        }
      }
        
      getMedia();
    },[currentVideoRef, mediaStream])

    return (
      <Video isLocal={true} name={rtcClient.localName} videoRef={videoRef}/>
    );
}

export default VideoLocal;