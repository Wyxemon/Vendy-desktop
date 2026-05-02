import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:
    "https://vendy-4687d-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getEmail(email) {
  const safeEmail = email.replace(/\./g, "_");
  const rute = `users/${safeEmail}`;
  const a = await get(ref(db, rute));
  if (a.exists()) {
    return a.val();
  } else {
    return false;
  }
}
