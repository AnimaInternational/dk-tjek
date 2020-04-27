import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAIW3BUtMYOn1jbO2rb0bbXp4BOAdXhWCM",
  authDomain: "anima-dk.firebaseapp.com",
  databaseURL: "https://anima-dk.firebaseio.com",
  projectId: "anima-dk",
  storageBucket: "anima-dk.appspot.com",
  messagingSenderId: "333224812856",
  appId: "1:333224812856:web:6600f89a095da2c21761cd",
});

export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();
