import FirebaseSignalingClient from "./FirebaseSignalingClient";

export default class RtcClient {
    constructor(setRtcClient) {
        const config = {
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org'
                },
            ],
        };

        this.rtcPeerConnection = new RTCPeerConnection(config);
        this.localName = "";
        this.remoteName = "";
        this._setRtcClient = setRtcClient;
        this.mediaStream = null
        this.firebaseSignalingClient = new FirebaseSignalingClient();
    }

    setRtcClient() {
        this._setRtcClient(this)
    }

    async getUserMedia(){
        try {
            const constraints = { audio: true, video: true }
            this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    
        }catch (err){
            console.error(err)
        }
    }

    startListening(name){
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