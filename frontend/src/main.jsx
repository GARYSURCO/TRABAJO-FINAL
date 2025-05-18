import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom'; // 👈 Importa BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 Aquí envolvemos todo con el Router */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);