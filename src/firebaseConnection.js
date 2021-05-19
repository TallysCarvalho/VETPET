import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCLNESpTcC-hm9O0FhhsimtMWS0pfoiUGM",
  authDomain: "sistema-3c35b.firebaseapp.com",
  projectId: "sistema-3c35b",
  storageBucket: "sistema-3c35b.appspot.com",
  messagingSenderId: "1055357100500",
  appId: "1:1055357100500:web:eca886e4ce1a9382a3f641"
};
// Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  
  export default firebase