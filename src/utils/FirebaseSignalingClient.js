import firebase from "firebase/app";
import 'firebase/database';

export default class FirebaseSignalingClient {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyBZFrvWj_WkDZHGJkkSuErwUCGOHORaU5A",
            authDomain: "react-webrtc-64850.firebaseapp.com",
            databaseURL: "https://react-webrtc-64850-default-rtdb.firebaseio.com",
            projectId: "react-webrtc-64850",
            storageBucket: "react-webrtc-64850.appspot.com",
            messagingSenderId: "705715137289",
            appId: "1:705715137289:web:ab00749a451e249f7f81d8"
        };
        if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.localName = "";
        this.remoteName = "";
    }

    setNames(localName, remoteName) {
        this.localName = localName;
        this.remoteName = remoteName;

    }

    get targetRef() {
        return this.database.ref(this.remoteName)
    }

    async sendOffer(sessionDescription) {
        await this.targetRef.set({
            type: 'offer',
            sender: this.localName,
            sessionDescription,
        })
    }

    async sendAnswer(sessionDescription) {
        await this.targetRef.set({
            type: 'answer',
            sender: this.localName,
            sessionDescription,
        })
    }

    async sendCandidate(candidate) {
        await this.targetRef.set({
            type: 'candidate',
            sender: this.localName,
            candidate,
        })
    }

    async remove(localName) {
        await this.database.ref(localName).remove()
    }
}