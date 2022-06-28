const Video = (props) => {
    const { isLocal, name, videoRef } = props
    return (
        <>
            <video ref={videoRef} autoPlay muted={isLocal} />
            <div>{name}</div>
        </>
    );
}

export default Video;