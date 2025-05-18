import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../pages/logo.png'; // Asegúrate de que esta ruta sea correcta

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-green-100 relative flex items-center justify-center">
      {/* Logo en esquina superior izquierda */}
      <div className="absolute top-4 left-4 z-50">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
      </div>

      {/* Contenedor central del login */}
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition font-semibold"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">¿No tienes una cuenta?</p>
          <button
            onClick={() => navigate('/register')}
            className="mt-1 text-green-700 font-semibold hover:underline"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


