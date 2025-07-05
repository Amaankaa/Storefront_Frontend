import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (!result.success) {
      // Handle login error - you might want to show this in the Login component
      console.error('Login failed:', result.error);
    }
  };

  const handleSignup = async (userData) => {
    const result = await signup(userData);
    if (!result.success) {
      // Handle signup error - you might want to show this in the Signup component
      console.error('Signup failed:', result.error);
    }
  };

  return (
    <div>
      {isLogin ? (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
}

export default Auth; 