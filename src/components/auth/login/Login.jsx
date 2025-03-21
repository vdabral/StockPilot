import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext/AuthContext";
import { useTheme } from "../../../contexts/themeContext/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const getFriendlyErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password. Try again.",
      "auth/too-many-requests": "Too many attempts. Please wait a moment.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
    return errorMessages[errorCode] || "Something went wrong. Try again.";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    try {
      await doSignInWithEmailAndPassword(email, password);
      if (rememberMe) {
        localStorage.setItem("rememberMe", email);
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate("/");
    } catch (error) {
      setErrorMessage(getFriendlyErrorMessage(error.code));
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Google Sign-In failed. Try again.");
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-white">
          Login
        </h2>

        {errorMessage && (
          <div
            aria-live="polite"
            className="text-red-500 text-sm mt-2 text-center"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-4">
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password Input with Show/Hide Feature */}
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              Remember Me
            </label>
            <a
              href="/reset-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:bg-gray-400"
          >
            {isSigningIn ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-gray-500 dark:text-gray-400">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center px-4 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          disabled={isSigningIn}
        >
          <FaGoogle className="mr-2" />{" "}
          {isSigningIn ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
