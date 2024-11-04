import firebase from "firebase/app";
import 'firebase/database';

export default class FirebaseSignalingClient {
    constructor() {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID
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