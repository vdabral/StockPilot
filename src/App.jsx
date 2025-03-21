import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Main from "./components/LandingPage/MainComponent/Main";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Watchlist from "./pages/Watchlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Coin from "./pages/Coin";
import "./App.css";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import { AuthProvider, useAuth } from "./contexts/authContext/AuthContext"; // Import Auth Context
import { ThemeProvider, useTheme } from "./contexts/themeContext/ThemeContext"; // Import Theme Context

function App() {
  const { user } = useAuth(); // Get authentication state
  const { theme } = useTheme(); // Get theme state

  // Theme configuration
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
      mode: theme,
      background: {
        default: theme === "dark" ? "#111827" : "#ffffff",
        paper: theme === "dark" ? "#1f2937" : "#f5f5f5",
      },
    },
    typography: {
      fontFamily: '"Inter", "system-ui", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "0.75rem",
          },
        },
      },
    },
  });

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const cursorPointer = document.getElementById("cursor-pointer");

    if (!cursor || !cursorPointer) return;

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorPointer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    };

    const handleMouseDown = () => {
      cursor.classList.add("cursor-clicked");
      cursorPointer.classList.add("cursor-pointer-clicked");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("cursor-clicked");
      cursorPointer.classList.remove("cursor-pointer-clicked");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <MuiThemeProvider theme={muiTheme}>
          <div className="app min-h-screen bg-gray-900 text-gray-100">
            {/* Custom cursor elements */}
            <div className="cursor hidden md:block" id="cursor" />
            <div
              className="cursor-pointer hidden md:block"
              id="cursor-pointer"
            />

            {/* Toast notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#1f2937",
                  color: "#fff",
                },
              }}
            />

            <Header />
            <main className="min-h-[calc(100vh-4rem)]">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />

                {/* Redirect authenticated users away from Login */}
                <Route
                  path="/login"
                  element={user ? <Navigate to="/dashboard" /> : <Login />}
                />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route path="" element={<Dashboard />} />
                </Route>
                <Route path="/compare" element={<ProtectedRoute />}>
                  <Route path="" element={<Compare />} />
                </Route>
                <Route path="/watchlist" element={<ProtectedRoute />}>
                  <Route path="" element={<Watchlist />} />
                </Route>
                <Route path="/coin/:id" element={<ProtectedRoute />}>
                  <Route path="" element={<Coin />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </MuiThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
