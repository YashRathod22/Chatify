import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDoc, getFirestore } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyABkX8vU73IoBMyvtGG73HI3j_UlW--htc",
  authDomain: "chat-application-fa9ed.firebaseapp.com",
  projectId: "chat-application-fa9ed",
  storageBucket: "chat-application-fa9ed.appspot.com",
  messagingSenderId: "1092061395013",
  appId: "1:1092061395013:web:57c24140b9b40ad28b0b2c",
  measurementId: "G-2676SMZ161"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBEOCN_csXVm2cNPRpK4P4QcuNvlpUYV60",
//   authDomain: "chatify-4c616.firebaseapp.com",
//   projectId: "chatify-4c616",
//   storageBucket: "chatify-4c616.appspot.com",
//   messagingSenderId: "168684323087",
//   appId: "1:168684323087:web:33173347c7cf94602fbe7a"
// };


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firebaseAuth = getAuth(app)
const firestoreDb = getFirestore(app)

const userRef = collection(firestoreDb,'users')
const roomsRef = collection(firestoreDb,'chats')

export { app, firebaseAuth, firestoreDb, auth, userRef, roomsRef };