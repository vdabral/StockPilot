import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase"; // Ensure firebase.js exports `auth`
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );

        setIsEmailUser(isEmail);
        setIsGoogleUser(isGoogle);
      } else {
        setCurrentUser(null);
        setIsEmailUser(false);
        setIsGoogleUser(false);
      }
      setLoading(false);
    });

    return unsubscribe; // Proper cleanup
  }, []);

  const value = {
    currentUser,
    isEmailUser,
    isGoogleUser,
    userLoggedIn: !!currentUser, // Deriving from currentUser instead of using extra state
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
}
