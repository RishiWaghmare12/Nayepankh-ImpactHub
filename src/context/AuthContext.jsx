import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Demo accounts — these bypass Firebase auth entirely
const DEMO_ACCOUNTS = {
  'admin@nayepankh.org': {
    password: 'Admin@123',
    profile: {
      uid: 'demo-admin-001',
      email: 'admin@nayepankh.org',
      displayName: 'Admin Demo',
      role: 'admin',
      totalDonations: 25000,
      volunteerHours: 120,
      eventsJoined: 15,
      impactScore: 980,
      badges: ['Top Donor', 'Event Organizer'],
      bio: 'Demo admin account',
      phone: '+91 98765 43210',
      location: 'Delhi, India',
      interests: ['Education', 'Healthcare'],
    },
  },
  'volunteer@demo.com': {
    password: 'Demo@123',
    profile: {
      uid: 'demo-volunteer-001',
      email: 'volunteer@demo.com',
      displayName: 'Volunteer Demo',
      role: 'volunteer',
      totalDonations: 500,
      volunteerHours: 48,
      eventsJoined: 6,
      impactScore: 340,
      badges: ['First Event'],
      bio: 'Demo volunteer account',
      phone: '+91 91234 56789',
      location: 'Mumbai, India',
      interests: ['Education', 'Community'],
    },
  },
  'donor@demo.com': {
    password: 'Demo@123',
    profile: {
      uid: 'demo-donor-001',
      email: 'donor@demo.com',
      displayName: 'Donor Demo',
      role: 'donor',
      totalDonations: 12000,
      volunteerHours: 0,
      eventsJoined: 2,
      impactScore: 600,
      badges: ['Generous Giver'],
      bio: 'Demo donor account',
      phone: '+91 99887 76655',
      location: 'Bangalore, India',
      interests: ['Nutrition', 'Child Welfare'],
    },
  },
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);

  const register = async (email, password, displayName, role = 'volunteer') => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const profileData = {
      uid: cred.user.uid,
      email,
      displayName,
      role,
      createdAt: serverTimestamp(),
      totalDonations: 0,
      volunteerHours: 0,
      eventsJoined: 0,
      impactScore: 0,
      badges: [],
      bio: '',
      phone: '',
      location: '',
      interests: [],
    };
    await setDoc(doc(db, 'users', cred.user.uid), profileData);
    return cred;
  };

  const login = async (email, password) => {
    const demo = DEMO_ACCOUNTS[email];
    if (demo) {
      if (demo.password !== password) {
        const err = new Error('Invalid email or password.');
        err.code = 'auth/invalid-credential';
        throw err;
      }
      const mockUser = {
        uid: demo.profile.uid,
        email: demo.profile.email,
        displayName: demo.profile.displayName,
        emailVerified: true,
        isAnonymous: false,
      };
      setUser(mockUser);
      setUserProfile(demo.profile);
      setIsDemoUser(true);
      return { user: mockUser };
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const userRef = doc(db, 'users', cred.user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: cred.user.displayName,
        role: 'volunteer',
        createdAt: serverTimestamp(),
        totalDonations: 0,
        volunteerHours: 0,
        eventsJoined: 0,
        impactScore: 0,
        badges: [],
        bio: '',
        phone: '',
        location: '',
        interests: [],
      });
    }
    return cred;
  };

  const logout = async () => {
    if (isDemoUser) {
      setUser(null);
      setUserProfile(null);
      setIsDemoUser(false);
      return;
    }
    return signOut(auth);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const fetchUserProfile = async (uid) => {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        setUserProfile(snap.data());
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // Don't overwrite demo session with Firebase's null signal
      if (isDemoUser) {
        setLoading(false);
        return;
      }
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserProfile(firebaseUser.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, [isDemoUser]);

  const value = {
    user,
    userProfile,
    loading,
    isDemoUser,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    fetchUserProfile,
    isAdmin: userProfile?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
