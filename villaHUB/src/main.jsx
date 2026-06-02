import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './Context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="8954303799-lo4b70efmsj5moev2n2vod95sa2og63f.apps.googleusercontent.com">
    <BrowserRouter>
      <AuthProvider>
        
          <App />
          <Toaster position="top-right" />
       
      </AuthProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
