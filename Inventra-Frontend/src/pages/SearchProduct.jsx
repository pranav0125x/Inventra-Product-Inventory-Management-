import { useState } from 'react';
import api from '../services/api';

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const response = await api.get(`/products/search?name=${searchTerm}`);
      setResults(response.data);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#0056b3', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Search Inventory</h2>
      
      <div style={{ display: 'flex', gap: '10px', maxWidth: '500px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Enter product name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn" onClick={handleSearch}>Search</button>
      </div>

      {hasSearched && results.length === 0 && (
        <p style={{ color: '#dc3545' }}>No products found matching "{searchTerm}".</p>
      )}

      {results.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0056b3', color: 'white', textAlign: 'left' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {results.map(product => (
              <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{product.id}</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>${product.price.toFixed(2)}</td>
                <td style={{ ...tdStyle, color: product.quantity < 5 ? '#dc3545' : '#333', fontWeight: 'bold' }}>
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { padding: '12px', border: '1px solid #ccc' };
const tdStyle = { padding: '10px', border: '1px solid #ccc' };

export default SearchProduct;