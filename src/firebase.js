import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBDMrF_EB5Bk8Oh9-rtt04_Dov9rqZc0F4",
  authDomain: "react-slack-clone-81458.firebaseapp.com",
  projectId: "react-slack-clone-81458",
  storageBucket: "react-slack-clone-81458.appspot.com",
  messagingSenderId: "749163431623",
  appId: "1:749163431623:web:beb724f674b3388f1220e2",
  measurementId: "G-6FDEQWJJ6R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
