// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ybp5J8R7X0BEQmDkXHhwKhWzmNMwUs4",
  authDomain: "ecofit-4bb40.firebaseapp.com",
  projectId: "ecofit-4bb40",
  storageBucket: "ecofit-4bb40.firebasestorage.app",
  messagingSenderId: "973647545410",
  appId: "1:973647545410:web:9b0e9c8e6adbfca4de59db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytesResumable, getDownloadURL };
