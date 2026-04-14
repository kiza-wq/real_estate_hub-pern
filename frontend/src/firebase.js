// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AuthDomain,
  projectId: import.meta.env.VITE_FIREBASE_ProjectId,
  storageBucket: import.meta.env.VITE_FIREBASE_StorageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MessagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_AppId,
  measurementId: import.meta.env.VITE_FIREBASE_MeasurementId,
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
