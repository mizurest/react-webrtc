import React from 'react';
import Video from './Video';

const VideoRemote = (props) => {
    const { rtcClient } = props
    const videoRef = null

    return (
      <Video isLocal={true} name={rtcClient.remoteName} videoRef={videoRef}/>
    );
}

export default VideoRemote;