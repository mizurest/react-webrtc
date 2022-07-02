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
    }

    setRtcClient() {
        this._setRtcClient(this)
    }
}