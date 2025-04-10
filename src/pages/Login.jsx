import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // For testing purposes, you can use:
  // username: 'mor_2314'
  // password: '83r5^_'

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>ShopReact</h1>
        <p className="subtitle">Sign in to continue shopping</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="test-credentials">
          <p>For testing, use:</p>
          <p>Username: mor_2314</p>
          <p>Password: 83r5^_</p>
        </div>
      </div>
      
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .login-container {
          background-color: var(--white);
          padding: 30px;
          border-radius: 8px;
          box-shadow: var(--box-shadow);
          width: 100%;
          max-width: 400px;
        }
        
        h1 {
          color: var(--primary-color);
          text-align: center;
          margin-bottom: 10px;
        }
        
        .subtitle {
          text-align: center;
          color: var(--dark-gray);
          margin-bottom: 30px;
        }
        
        .login-button {
          width: 100%;
          padding: 12px;
          font-size: 1.1rem;
          margin-top: 10px;
        }
        
        .test-credentials {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid var(--medium-gray);
          font-size: 0.9rem;
          color: var(--dark-gray);
        }
        
        .test-credentials p {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default Login;
