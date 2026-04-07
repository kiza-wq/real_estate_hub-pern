// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-hub-pern.firebaseapp.com",
  projectId: "real-estate-hub-pern",
  storageBucket: "real-estate-hub-pern.firebasestorage.app",
  messagingSenderId: "742983989631",
  appId: "1:742983989631:web:85826e57100d08950c824a",
  measurementId: "G-9Y5WGL4FZF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



/* rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if request.resource.size < 5 * 1024 * 1024 && request.resource.contentType.matches('image/.*') ;
    }
  }
} */