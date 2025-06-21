// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDtZgMkcyWmquZMQCZdNY6lWExNVI4wPyw",
  authDomain: "data-visualisation-e6f1f.firebaseapp.com",
  projectId: "data-visualisation-e6f1f",
  storageBucket: "data-visualisation-e6f1f.firebasestorage.app",
  messagingSenderId: "27305884387",
  appId: "1:27305884387:web:fb79cf8a060c2b45af23d6",
  measurementId: "G-60ZC0FGJZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;