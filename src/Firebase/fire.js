import firebase from "firebase";


var firebaseConfig = {
  ///make more secure with ./.env.local
  apiKey: "AIzaSyCN8DOSeORM1CnAZMm4cnoEPG9WkHzCxUE",
  authDomain: "fs-logistics-cf3ca.firebaseapp.com",
  databaseURL: "https://fs-logistics-cf3ca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fs-logistics-cf3ca",
  storageBucket: "fs-logistics-cf3ca.appspot.com",
  messagingSenderId: "322684017442",
  appId: "1:322684017442:web:2cc6e9e15f6fe120e5237b",
  measurementId: "G-ZDS2NWKM6F"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
