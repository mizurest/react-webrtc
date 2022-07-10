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

    async answer(sender, sessionDescription) {
        try{
            this.remoteName = sender
            this.setOnicecandidate()
            this.setOntrack()
            await this.setRemoteDescription(sessionDescription)
            const answer = await this.rtcPeerConnection.createAnswer();
            await this.rtcPeerConnection.setLocalDescription(answer);

            await this.sendAnswer()
        }catch(e){
            console.error(e)
        }
    }

    async connect(remoteName) {
        this.remoteName = remoteName
        this.setOnicecandidate()
        this.setOntrack()
        await this.offer()
        this.setRtcClient()
    }

    setOnicecandidate() {
        this.rtcPeerConnection.onicecandidate = async(e) => {
            if(e.candidate){
                // 相手に通信経路(candidate)を送信
                console.log(e.candidate)
                await this.firebaseSignalingClient.sendCandidate(e.candidate.toJSON())
            }
        }
    }

    async addIceCandidate(candidate){
        try{
            const candidateObj = new RTCIceCandidate(candidate)
            await this.rtcPeerConnection.addIceCandidate(candidateObj)
        }catch(e){
            console.error(e)
        }
        
    }

    setOntrack() {
        this.rtcPeerConnection.ontrack = (RTCTrackEvent) => {
            if(RTCTrackEvent.track.kind !== "video") return

            const remoteMediaStream = RTCTrackEvent.streams[0]
            this.remoteVideoRef.current.srcObject = remoteMediaStream
            this.setRtcClient()
        }
        this.setRtcClient()
    }

    async offer() {
        const sessionDescription = await this.createOffer()
        await this.setLocalDescription(sessionDescription)
        await this.sendOffer()
    }

    async createOffer() {
        try {
            return await this.rtcPeerConnection.createOffer()
        } catch(e) {
            console.error(e)
        }
    }

    async setLocalDescription(sessionDescription) {
        try {
            await this.rtcPeerConnection.setLocalDescription(sessionDescription)
        } catch(e) {
            console.error(e)
        }
    }

    async setRemoteDescription(sessionDescription) {
        await this.rtcPeerConnection.setRemoteDescription(sessionDescription)
    }

    async sendOffer(){
        this.firebaseSignalingClient.setNames(this.localName, this.remoteName)

        // firebaseにoffer送信
        await this.firebaseSignalingClient.sendOffer(this.localDescription)
    }

    async sendAnswer() {
        this.firebaseSignalingClient.setNames(this.localName, this.remoteName)

        // firebaseにanswer送信
        await this.firebaseSignalingClient.sendAnswer(this.localDescription)
    }

    get localDescription() {
        console.log(this.rtcPeerConnection.localDescription)
        return this.rtcPeerConnection.localDescription.toJSON();
    }

    async saveRecievedSessionDescription(sessionDescription){
        try {
            await this.setRemoteDescription(sessionDescription)
        } catch(e){
            console.error(e)
        }
    }


    async startListening(localName) {
        this.localName = localName
        this.setRtcClient()

        // await this.firebaseSignalingClient.remove(localName)
        //シグナリングサーバをリスンする処理
        this.firebaseSignalingClient.database
            .ref(localName)
            .on('value', async(snapshot) => {
                const data = snapshot.val()
                console.log(data)
                if(data === null) return
                const { candidate, sender, sessionDescription, type } = data
                switch(type){
                    case 'offer':
                        console.log(sessionDescription)
                        await this.answer(sender, sessionDescription)
                        // console.log('case offer')
                        break
                    case 'answer':
                        await this.saveRecievedSessionDescription(sessionDescription)
                        // console.log('case answer')
                        break
                    case 'candidate':
                        await this.addIceCandidate(candidate)
                        break
                    default:
                        // console.log('case default')
                        this.setRtcClient()
                        break
                }
            })
    }
}