import { useState, useEffect } from 'react';
import api from '../services/api';

const CrudOperations = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  
  // Track if we are editing an existing product
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', category: '', quantity: '', price: '', supplier: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD OR UPDATE PRODUCT
  // ADD OR UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      let response;
      
      if (editingId) {
        // Update existing
        response = await api.put(`/products/${editingId}`, formData);
      } else {
        // Add new
        response = await api.post('/products', formData);
      }

      // Check if the backend sent back an error object instead of a product
      if (response.data && response.data.error) {
        setMessage('❌ ' + response.data.error);
        return; // Stop execution here so it doesn't clear the form!
      }

      // If no error, show success and reset
      setMessage(editingId ? '✅ Product updated successfully!' : '✅ Product added successfully!');
      setFormData({ name: '', category: '', quantity: '', price: '', supplier: '' });
      setEditingId(null);
      fetchProducts(); 
      
    } catch (error) {
      // If the server completely rejects the request
      if (error.response && error.response.data && error.response.data.error) {
        setMessage('❌ ' + error.response.data.error);
      } else {
        setMessage('❌ Error processing request. Check your data.');
      }
    }
  };

  // START EDITING
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      supplier: product.supplier
    });
    window.scrollTo(0, 0); // Scroll to top form
  };

  // CANCEL EDITING
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', quantity: '', price: '', supplier: '' });
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setMessage('✅ Product deleted successfully.');
      fetchProducts();
    } catch (error) {
      setMessage('❌ Error deleting product.');
    }
  };

  // FILTER & SORT
  const handleSort = async (e) => {
    const field = e.target.value;
    if (!field) return fetchProducts();
    try {
      const response = await api.get(`/products/sort/${field}`);
      setProducts(response.data);
    } catch (error) { console.error(error); }
  };

  const handleFilter = async (e) => {
    const category = e.target.value;
    if (!category) return fetchProducts();
    try {
      const response = await api.get(`/products/category/${category}`);
      setProducts(response.data);
    } catch (error) { console.error(error); }
  };

  return (
    <div>
      <h2 style={{ color: '#0056b3', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Manage Products
      </h2>
      
      {message && <p style={{ fontWeight: 'bold', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>{message}</p>}

      {/* FORM AREA */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, color: editingId ? '#d39e00' : '#333' }}>
          {editingId ? `Editing Product ID: ${editingId}` : 'Add New Product'}
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required style={inputStyle} />
          <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleInputChange} required min="0" style={inputStyle} />
          <input type="number" step="0.01" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required min="0" style={inputStyle} />
          <input type="text" name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleInputChange} required style={inputStyle} />
          
          <button type="submit" className="btn" style={{ backgroundColor: editingId ? '#ffc107' : '#28a745', padding: '10px 20px', color: editingId ? 'black' : 'white' }}>
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn" style={{ backgroundColor: '#6c757d', padding: '10px 20px' }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* CONTROLS (FILTER & SORT) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>Current Inventory</h3>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <select onChange={handleFilter} style={selectStyle}>
            <option value="">All Categories (Clear Filter)</option>
            {/* You can hardcode your categories or map them dynamically. Here are examples: */}
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Groceries">Groceries</option>
          </select>

          <select onChange={handleSort} style={selectStyle}>
            <option value="">Sort By...</option>
            <option value="name">Name (A-Z)</option>
            <option value="price">Price (Low to High)</option>
            <option value="quantity">Stock (Low to High)</option>
          </select>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#0056b3', color: 'white', textAlign: 'left' }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{product.id}</td>
              <td style={tdStyle}>{product.name}</td>
              <td style={tdStyle}>{product.category}</td>
              <td style={tdStyle}>{product.quantity}</td>
              <td style={tdStyle}>₹{product.price.toFixed(2)}</td>
              <td style={{ ...tdStyle, display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEdit(product)} 
                  style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const inputStyle = { flex: '1 1 120px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' };
const selectStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' };
const thStyle = { padding: '12px', border: '1px solid #ccc' };
const tdStyle = { padding: '10px', border: '1px solid #ccc' };

export default CrudOperations;