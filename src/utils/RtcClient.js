import FirebaseSignalingClient from "./FirebaseSignalingClient";

export default class RtcClient {
    constructor(remoteVideoRef, setRtcClient) {
        const config = {
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org'
                },
            ],
        };

        this.rtcPeerConnection = new RTCPeerConnection(config)
        this.localName = ""
        this.remoteName = ""
        this._setRtcClient = setRtcClient
        this.mediaStream = null
        this.remoteVideoRef = remoteVideoRef
        this.firebaseSignalingClient = new FirebaseSignalingClient()
    }

    setRtcClient() {
        this._setRtcClient(this)
    }

    // ユーザーにメディアの使用許可を出してmediastreamを受け取るメソッド
    async getUserMedia() {
        try {
            const constraints = { audio: true, video: true }
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    
        }catch (err){
            console.error(err)
        }
    }

    // ユーザーのメディアを取得してmediastreamを設定するメソッド
    async setMediaStream() {
        await this.getUserMedia()
        this.addTracks()
        this.setRtcClient()
    }

    addTracks() {
        this.addAudioTrack()
        this.addVideoTrack()
    }

    addAudioTrack() {
        const audioTrack = this.mediaStream.getAudioTracks()[0]
        console.log(audioTrack)
        this.rtcPeerConnection.addTrack(audioTrack, this.mediaStream)
    }

    addVideoTrack() {
        const videoTrack = this.mediaStream.getVideoTracks()[0]
        console.log(videoTrack)
        this.rtcPeerConnection.addTrack(videoTrack, this.mediaStream)
    }

    startListening(name) {
        this.localName = name
        this.setRtcClient()

        //シグナリングサーバをリスンする処理
        this.firebaseSignalingClient.database
            .ref(name)
            .on('value', (snapshot) => {
                const data = snapshot.val()
            })
    }
}