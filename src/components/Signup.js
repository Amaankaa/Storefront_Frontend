import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup({ onSwitchToLogin }) {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: ''
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

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    // Check if password is too similar to username
    if (formData.password.toLowerCase().includes(formData.username.toLowerCase()) || 
        formData.username.toLowerCase().includes(formData.password.toLowerCase())) {
      setError('Password cannot be too similar to your username');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    const result = await signup(formData);
    if (!result.success) {
      setError(result.error || 'Registration failed. Please try again.');
    } else {
      navigate('/products');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-800 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-500 opacity-30 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg">Create Account</h2>
          <p className="text-gray-400 mb-8 text-center">Join Storefront and unlock exclusive deals, fast checkout, and more!</p>
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow col-span-1"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow col-span-1"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-lg px-4 py-3 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-lg shadow"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
              className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-white font-bold rounded-lg shadow-lg hover:from-indigo-400 hover:to-yellow-300 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <div className="mt-8 text-gray-400 text-sm text-center">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-yellow-300 hover:text-indigo-300 font-semibold transition"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup; 