import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGofU0v-mgo7OUiiaetmaNHEUSjWEAcuE",
  authDomain: "chatapplication-33dd9.firebaseapp.com",
  projectId: "chatapplication-33dd9",
  storageBucket: "chatapplication-33dd9.appspot.com",
  messagingSenderId: "614673415255",
  appId: "1:614673415255:web:30ffbf9eb4545c070fb712"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}