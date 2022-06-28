import React, { useRef, useEffect } from 'react';
import Video from './Video';

const VideoLocal = (props) => {
  const { localName } = props
    const videoRef = useRef(null)
    const currentVideoRef = videoRef.current

    useEffect(() => {
      if(currentVideoRef === null) return
      const getMedia = async () => {
          const constraints = {audio: true, video: true} //　要求するメディアの種類を指定
        
          try {
            // MediaStreamを受け取ってRefに設定
            const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
            currentVideoRef.srcObject = mediaStream
          } catch(err) {
            console.error(err)
          }
        }
        
      getMedia();
    },[currentVideoRef])

    return (
      <Video isLocal={true} name={localName} videoRef={videoRef}/>
    );
}

export default VideoLocal;