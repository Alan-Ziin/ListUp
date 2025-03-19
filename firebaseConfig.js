import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDcIEkYkXMymTosA70H8kqTI3MttVb_1-Y",
  authDomain: "listup-7eac3.firebaseapp.com",
  projectId: "listup-7eac3",
  storageBucket: "listup-7eac3.firebasestorage.app",
  messagingSenderId: "791096505054",
  appId: "1:791096505054:web:47cd3c3b7ab41c55cf084f",
  measurementId: "G-3PKXN7WL7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { db, auth, collection, addDoc, getDocs, doc, setDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword, orderBy, query };
