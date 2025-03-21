import { auth, db } from "./firebase"; // Ensure db is imported from firebase config
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut, // Import signOut separately for clarity
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import getDoc to check existing users

// Sign up with email & password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Check if user already exists in Firestore before adding
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        provider: "email",
      });
    }

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { error: error.message };
  }
};

// Sign in with email & password
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { error: error.message };
  }
};

// Sign in with Google
export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: "google",
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    return { error: error.message };
  }
};

// Sign out
export const doSignOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
    return { error: error.message };
  }
};

// Password reset
export const doPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return { error: error.message };
  }
};

// Change password (Requires recent authentication)
export const doPasswordChange = async (password) => {
  const user = auth.currentUser;
  if (!user) {
    return { error: "No authenticated user found" };
  }
  try {
    await updatePassword(user, password);
    console.log("Password updated successfully");
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      console.error("Error: Recent login required to update password.");
      return { error: "Please re-login before updating your password." };
    }
    console.error("Error updating password:", error.message);
    return { error: error.message };
  }
};

// Send email verification (Requires recent authentication)
export const doSendEmailVerification = async () => {
  const user = auth.currentUser;
  if (!user) {
    return { error: "No authenticated user found" };
  }
  try {
    await sendEmailVerification(user, {
      url: `${window.location.origin}/home`,
    });
    console.log("Verification email sent");
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      console.error("Error: Recent login required to send verification email.");
      return { error: "Please re-login before verifying your email." };
    }
    console.error("Error sending verification email:", error.message);
    return { error: error.message };
  }
};
