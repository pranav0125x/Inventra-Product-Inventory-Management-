import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/login', { username, password });
      
      if (response.data === 'Login Successful') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/app/dashboard');
      } else {
        setError('Wrong Credentials');
      }
    } catch (err) {
      setError('Server Error. Ensure backend is running.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#e9ecef' }}>
      <div className="card" style={{ width: '350px', textAlign: 'center' }}>
        <h2 style={{ color: '#0056b3' }}>Admin Login</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Please sign in to continue</p>
        
        {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
