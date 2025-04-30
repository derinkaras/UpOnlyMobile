// Updated AuthProvider with validation and using react-native-toast-message
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, firestore } from "@/config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import Toast from 'react-native-toast-message';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";



interface AuthContextType {
    user: any;
    login: (email: string, password: string, name?: string) => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean }>;
    logout: () => Promise<{ success: boolean; message?: string }>;
    changeEmail: (currentPassword: string, newEmail: string) => Promise<{ success: boolean; message?: string }>;
    updateUserData: (userId: string) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                updateUserData(currentUser.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string): boolean => password.length >= 6;

    const login = async (email: string, password: string, name = "user") => {
        try {
            if (!email.trim() || !validateEmail(email)) {
                Toast.show({ type: 'error', text1: 'Invalid Email', text2: 'Please enter a valid email address' });
                return;
            }
            if (!password) {
                Toast.show({ type: 'error', text1: 'Password Required', text2: 'Please enter your password' });
                return;
            }

            setLoading(true);
            const response = await signInWithEmailAndPassword(auth, email, password);
            await updateUserData(response.user.uid, name);
            Toast.show({ type: 'success', text1: 'Login Successful', text2: 'Welcome back!' });
        } catch (error: any) {
            let userFriendlyMessage = 'Login failed';
            if (error.message.includes('user-not-found') || error.message.includes('wrong-password')) {
                userFriendlyMessage = 'Invalid email or password';
            } else if (error.message.includes('too-many-requests')) {
                userFriendlyMessage = 'Too many failed attempts. Try again later';
            }
            Toast.show({ type: 'error', text1: 'Login Failed', text2: userFriendlyMessage });
        } finally {
            setLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            if (!name.trim() || !email.trim() || !validateEmail(email) || !validatePassword(password)) {
                Toast.show({ type: 'error', text1: 'Invalid Input', text2: 'Please fill all fields correctly' });
                return { success: false };
            }

            setLoading(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = { uid: response.user.uid, email, name };

            await setDoc(doc(firestore, "users", response.user.uid), newUser);
            // @ts-ignore
            setUser(newUser);

            Toast.show({ type: 'success', text1: 'Account Created', text2: 'Welcome to the app!' });
            return { success: true };
        } catch (error: any) {
            console.log("Error within the signup: ", error.message);
            let userFriendlyMessage = 'Sign up failed';
            if (error.message.includes('email-already-in-use')) userFriendlyMessage = 'Email is already in use';
            else if (error.message.includes('invalid-email')) userFriendlyMessage = 'Invalid email format';
            else if (error.message.includes('weak-password')) userFriendlyMessage = 'Password is too weak';

            Toast.show({ type: 'error', text1: 'Sign Up Failed', text2: userFriendlyMessage });
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setUser(null);
            Toast.show({ type: 'success', text1: 'Logged Out', text2: 'You have been successfully logged out' });
            return { success: true };
        } catch (error: any) {
            console.log("Error logging out:", error.message);
            Toast.show({ type: 'error', text1: 'Logout Failed', text2: 'There was a problem logging you out' });
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const updateUserData = async (uid: string, name = "user") => {
        try {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // @ts-ignore
                setUser(docSnap.data());
            } else {
                const basicUserData = {
                    uid,
                    email: auth.currentUser?.email || null,
                    name
                };
                await setDoc(docRef, basicUserData);
                // @ts-ignore
                setUser(basicUserData);
            }
            return { success: true };
        } catch (error: any) {
            console.log("Error in updateUserData:", error.message);
            Toast.show({ type: 'error', text1: 'User Data Error', text2: 'Failed to retrieve user information' });
            return { success: false, message: error.message };
        }
    };


    async function changeEmail(currentPassword: string, newEmail: string): Promise<{ success: boolean; message?: string }> {
        if (!auth.currentUser) {
            return { success: false, message: "No user is signed in." };
        }
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        try {
            await reauthenticateWithCredential(user, credential);
            console.log('Reauthenticated successfully!');

            await updateEmail(user, newEmail);
            console.log('Email updated successfully!');
            return { success: true, message: "Email updated successfully." };
        } catch (error: any) {
            console.error('Error updating email:', error);
            return { success: false, message: error.message || "Unknown error" };
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, changeEmail, updateUserData}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be wrapped inside AuthProvider");
    return context;
};
