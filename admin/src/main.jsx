import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PrimeReactProvider>
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </PrimeReactProvider>
    </AuthProvider>
  </BrowserRouter>
);
