import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDe7O8a0imbqqc7RHH9-Wo-1guCl4dUiCs",
  authDomain: "mo-pretask.firebaseapp.com",
  projectId: "mo-pretask",
  storageBucket: "mo-pretask.appspot.com",
  messagingSenderId: "970026590837",
  appId: "1:970026590837:web:04d93e34c2a0e2df9a4e3c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
