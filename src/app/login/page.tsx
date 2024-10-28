"use client"
import { useEffect, useState } from 'react';
import { signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, provider } from '@/config/firebase';

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
    console.log(user, 'user', user?.photoURL)
  useEffect(() => {
    setMounted(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User photoURL:", currentUser.photoURL);  // Log to verify URL
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login with Google</h1>
        
        {user ? (
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL || '/users/erica.jpg'}  // Fallback to placeholder
              alt="User Avatar"
              className="w-24 h-24 rounded-full mb-4"
              onError={(e) => (e.currentTarget.src = '/users/erica.jpg')} // Image error handler
            />
            <h2 className="text-lg font-semibold text-black">{user.displayName}</h2>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
