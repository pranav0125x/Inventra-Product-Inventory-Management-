import { Link, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#0056b3', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 5px 0' }}>Inventra</h1>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Professional Inventory Management System</p>
      </header>

      {/* NAVBAR */}
      <nav style={{ backgroundColor: '#e9ecef', padding: '15px', display: 'flex', justifyContent: 'center', gap: '20px', borderBottom: '1px solid #ccc' }}>
        <Link to="/app/dashboard" style={navLinkStyle}>Dashboard</Link>
        <Link to="/app/search" style={navLinkStyle}>Search Product</Link>
        <Link to="/app/crud" style={navLinkStyle}>Manage Products</Link>
        <button onClick={handleLogout} style={{ ...navLinkStyle, background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* DYNAMIC CONTENT AREA */}
      <main style={{ flex: 1, padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div className="card">
          <Outlet /> 
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#343a40', color: 'white', textAlign: 'center', padding: '15px', fontSize: '14px' }}>
        <p style={{ margin: 0 }}>© 2026 Inventra Systems | Secure Admin Portal</p>
      </footer>

    </div>
  );
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '16px'
};

export default Layout;
