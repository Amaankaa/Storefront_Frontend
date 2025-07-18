import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login 
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <Signup 
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
}

export default Auth; 