import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBpy1dxXqDQAwhR6lKnnG1OJKICTbDBReQ",
  authDomain: "it-sysarch32-store-galay.firebaseapp.com",
  projectId: "it-sysarch32-store-galay",
  storageBucket: "it-sysarch32-store-galay.appspot.com",
  messagingSenderId: "707061468232",
  appId: "1:707061468232:web:3ce05f2ed313e4b7c2dc7d",
  measurementId: "G-D88HH93QJZ"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firebase, firestore };

