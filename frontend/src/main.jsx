import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfileContextProvider } from './context/profileContext.jsx'
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById('root')).render(
    <ProfileContextProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </BrowserRouter>
    </ProfileContextProvider> 
)
