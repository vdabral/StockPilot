import { auth, db } from "./firebase"; // Ensure db is imported from firebase config
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signOut, // Import signOut separately for clarity
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign in with Google
export const doSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
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
