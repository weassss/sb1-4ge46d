import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAnwzkFHW2SXFGUwFGNjxPdNYr2zyR4FhI",
  authDomain: "um-inc.firebaseapp.com",
  projectId: "um-inc",
  storageBucket: "um-inc.firebasestorage.app",
  messagingSenderId: "714328221303",
  appId: "1:714328221303:web:435864865363fc938d8872",
  measurementId: "G-HPJBPDX6TQ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Default content structure
const defaultContent: Record<string, DocumentData> = {
  hero: {
    title: "Transform Your Enterprise with",
    company: " UM Inc",
    description: "Empowering businesses with innovative solutions for digital transformation and sustainable growth in the modern era."
  }
};

// Initialize default content if it doesn't exist
const initializeContent = async () => {
  try {
    const contentRef = collection(db, 'content');
    
    // Initialize content for each section
    for (const [section, data] of Object.entries(defaultContent)) {
      const docRef = doc(contentRef, section);
      await setDoc(docRef, data, { merge: true });
    }
  } catch (error) {
    console.error("Error initializing content:", error);
  }
};

// Run initialization
initializeContent().catch(console.error);

export { app, db, auth, storage, defaultContent };