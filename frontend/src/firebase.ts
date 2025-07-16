import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'TWOJ_API_KEY',
  authDomain: 'TWOJ_AUTH_DOMAIN',
  projectId: 'TWOJ_PROJECT_ID',
  storageBucket: 'TWOJ_STORAGE_BUCKET',
  messagingSenderId: 'TWOJ_MESSAGING_SENDER_ID',
  appId: 'TWOJ_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
