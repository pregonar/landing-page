
import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    User
} from "firebase/auth";
import { auth } from "./firebase";

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

const mapUserToProfile = (user: User): UserProfile => {
    let role: UserRole = 'USER';
    const email = user.email || '';
    let tribeContext = undefined;

    // --- ROLE MAPPING LOGIC (Preserved from simulation) ---
    // In a production app, this should come from a 'users' collection in Firestore
    if (email.includes('admin') || email === 'admin@pregonar.com') { // Explicit check for requested admin
        role = 'SUPER_ADMIN';
    } else if (email.includes('org')) {
        role = 'ORGANIZER';
    } else if (email.includes('inst')) {
        role = 'INSTRUCTOR';
    } else if (email.includes('tribe')) {
        role = 'TRIBE_ADMIN';
        tribeContext = {
            adminOf: '1',
            tribeName: 'Urban Runners Club'
        };
    } else if (email.includes('support')) {
        role = 'PREGONERO_ADMIN';
    }

    return {
        uid: user.uid,
        displayName: user.displayName || email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        role,
        tribeContext
    };
};

export const loginWithGoogle = async (): Promise<UserProfile> => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return mapUserToProfile(result.user);
};

export const loginWithEmail = async (email: string, password: string): Promise<UserProfile> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return mapUserToProfile(userCredential.user);
    } catch (error: any) {
        console.error("Login failed:", error);
        throw new Error(mapAuthError(error.code));
    }
};

export const registerWithEmail = async (name: string, email: string, password: string): Promise<UserProfile> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Ideally update profile here with name
        return mapUserToProfile(userCredential.user);
    } catch (error: any) {
        console.error("Registration failed:", error);
        throw new Error(mapAuthError(error.code));
    }
};

export const recoverPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error("Recover password failed:", error);
        throw new Error(mapAuthError(error.code));
    }
};

export const logout = async () => {
    await signOut(auth);
};

// Helper to translate Firebase errors to Spanish
const mapAuthError = (code: string): string => {
    switch (code) {
        case 'auth/invalid-email': return 'Email inválido.';
        case 'auth/user-disabled': return 'Usuario deshabilitado.';
        case 'auth/user-not-found': return 'Usuario no encontrado.';
        case 'auth/wrong-password': return 'Contraseña incorrecta.';
        case 'auth/email-already-in-use': return 'El email ya está en uso.';
        default: return 'Error de autenticación.';
    }
};
