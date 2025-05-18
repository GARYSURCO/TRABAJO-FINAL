import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const RegisterPage = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Crear cuenta</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
