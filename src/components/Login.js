import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login({ onSwitchToSignup }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(formData);
    if (!result.success) {
      setError(result.error || 'Login failed. Please check your credentials.');
    } else {
      navigate('/products');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Sign In</h2>
          <p className="text-gray-400 mb-8 text-center">Welcome back! Please enter your credentials to access your account.</p>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center font-semibold mt-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:from-yellow-300 hover:to-indigo-400 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-8 text-gray-400 text-sm text-center">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-indigo-300 hover:text-yellow-300 font-semibold transition"
            >
              Create one
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 