import React, { useRef, useEffect } from 'react';
import Video from './Video';

const VideoRemote = (props) => {
    const { remoteName } = props
    const videoRef = null

    return (
      <Video isLocal={true} name={remoteName} videoRef={videoRef}/>
    );
}

export default VideoRemote;