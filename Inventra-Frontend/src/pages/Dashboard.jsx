import { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalValue: 0, lowStockCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/products/dashboard');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard data...</p>;

  return (
    <div>
      <h2 style={{ color: '#0056b3', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Dashboard Overview</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Total Products Card */}
        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: '#555' }}>Total Products</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0' }}>{stats.totalProducts}</p>
        </div>

        {/* Total Value Card */}
        <div style={cardStyle}>
          <h3 style={{ margin: 0, color: '#555' }}>Total Inventory Value</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#28a745' }}>
            ₹{stats.totalValue.toFixed(2)}
          </p>
        </div>

        {/* Low Stock Card */}
        <div style={{ ...cardStyle, borderLeft: stats.lowStockCount > 0 ? '5px solid #dc3545' : '5px solid #28a745' }}>
          <h3 style={{ margin: 0, color: '#555' }}>Low Stock Items</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0 0 0', color: stats.lowStockCount > 0 ? '#dc3545' : '#333' }}>
            {stats.lowStockCount}
          </p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #dee2e6',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

export default Dashboard;