
// --- REAL FIREBASE IMPLEMENTATION (Uncomment and add your config to use) ---
/*
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => { ... };
export const loginWithEmail = async (email, password) => { ... };
export const registerWithEmail = async (email, password) => { ... };
export const recoverPassword = async (email) => { ... };
*/

// --- SIMULATED IMPLEMENTATION (For UI Demonstration) ---

export type UserRole = 'SUPER_ADMIN' | 'ORGANIZER' | 'INSTRUCTOR' | 'USER' | 'TRIBE_ADMIN' | 'PREGONERO_ADMIN';

export type UserProfile = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: UserRole;
  tribeContext?: {
      adminOf: string; // ID of the tribe they manage
      tribeName: string;
  };
};

const MOCK_USER: UserProfile = {
    uid: '123456789',
    displayName: 'Alex Morgan',
    email: 'alex.morgan@gmail.com',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    role: 'USER'
};

export const loginWithGoogle = async (): Promise<UserProfile> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_USER;
};

export const loginWithEmail = async (email: string, password: string): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (password === 'error') throw new Error('Credenciales inválidas');
    
    // --- ROLE SIMULATION LOGIC FOR DEMO ---
    let role: UserRole = 'USER';
    let name = email.split('@')[0];
    let photo = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200';
    let tribeContext = undefined;

    if (email.includes('admin')) {
        role = 'SUPER_ADMIN';
        name = 'Super Admin';
        photo = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200';
    } else if (email.includes('org')) {
        role = 'ORGANIZER';
        name = 'Eventos Latam';
        photo = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200';
    } else if (email.includes('inst')) {
        role = 'INSTRUCTOR';
        name = 'Coach Mike';
        photo = 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=200';
    } else if (email.includes('tribe')) {
        role = 'TRIBE_ADMIN';
        name = 'Sarah (Runners Club)';
        photo = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200';
        tribeContext = {
            adminOf: '1', // ID corresponding to Urban Runners Club in mock data
            tribeName: 'Urban Runners Club'
        };
    } else if (email.includes('support')) {
        role = 'PREGONERO_ADMIN';
        name = 'Support Agent';
        photo = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200';
    }

    return { 
        uid: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email, 
        displayName: name,
        photoURL: photo,
        role: role,
        tribeContext
    };
};

export const registerWithEmail = async (name: string, email: string, password: string): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { ...MOCK_USER, email: email, displayName: name, role: 'USER' };
};

export const recoverPassword = async (email: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Password reset email sent to ${email}`);
    return;
};

export const logout = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return;
};
