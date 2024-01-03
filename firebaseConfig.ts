import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6ot2R4ed-HYuOIBscZbxHq8m2mh88RYI",
  authDomain: "reactnative-sde.firebaseapp.com",
  projectId: "reactnative-sde",
  storageBucket: "reactnative-sde.appspot.com",
  messagingSenderId: "1030717963322",
  appId: "1:1030717963322:web:af9186a438b3e56f20c903",
  measurementId: "G-EKYYNLJV2T",
  databaseURL:
    "https://reactnative-sde-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export const FIREBASE_APP = initializeApp(firebaseConfig);
// initializeAuth(FIREBASE_APP, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB, FIREBASE_DATABASE, FIREBASE_STORAGE };
