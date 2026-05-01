import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  AlertCircle,
  LayoutDashboard,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Diamond
} from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const { 
    products, 
    categories, 
    deleteProduct, 
    deleteCategory,
    addProduct,
    updateProduct,
    addCategory,
    updateCategory
  } = useStore();

  const [activeTab, setActiveTab] = useState('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');

  if (!isAdmin) return <Navigate to="/login" />;

  const handleDeleteCategory = (id) => {
    try {
      deleteCategory(id);
      setError('');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditItem = (item, type) => {
    setEditingItem(item);
    if (type === 'product') setShowProductModal(true);
    else setShowCategoryModal(true);
  };

  const stats = [
    { label: 'Inventory', value: products.length, icon: <Package size={18} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Categories', value: categories.length, icon: <Layers size={18} />, color: 'bg-purple-50 text-purple-600' },
    { label: 'Total Value', value: `$${(products.reduce((acc, p) => acc + p.price, 0) / 100).toLocaleString()}`, icon: <DollarSign size={18} />, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Featured', value: products.filter(p => p.featured).length, icon: <Diamond size={18} />, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-surface-muted px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary text-secondary rounded-lg">
                <LayoutDashboard size={20} />
              </div>
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Maison Dashboard</h1>
            </div>
            <p className="text-text-muted text-sm">Manage your luxury collection and boutique categories.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setEditingItem(null); setShowCategoryModal(true); }}
              className="px-4 py-2 text-xs uppercase tracking-widest border border-primary hover:bg-primary hover:text-secondary transition-all"
            >
              New Category
            </button>
            <button 
              onClick={() => { setEditingItem(null); setShowProductModal(true); }}
              className="px-4 py-2 text-xs uppercase tracking-widest bg-primary text-secondary hover:bg-accent hover:text-primary transition-all"
            >
              New Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface p-6 border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">{stat.label}</span>
                <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
              </div>
              <p className="text-2xl font-display font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-border-light mb-8">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'products' ? 'border-b-2 border-accent text-primary' : 'text-text-muted hover:text-primary'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`px-8 py-4 text-xs uppercase tracking-widest font-bold transition-all ${activeTab === 'categories' ? 'border-b-2 border-accent text-primary' : 'text-text-muted hover:text-primary'}`}
          >
            Categories
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-center gap-3 text-red-700 text-sm animate-fade-in">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Content */}
        <div className="bg-surface border border-border-light overflow-hidden shadow-sm">
          {activeTab === 'products' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-muted text-[10px] uppercase tracking-widest font-bold text-text-muted border-b border-border-light">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-surface-muted/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={product.image} className="w-12 h-12 object-cover border border-border-light" alt="" />
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-[10px] text-text-muted uppercase">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 bg-surface-muted border border-border-light text-text-secondary">
                          {categories.find(c => c.id === product.categoryId)?.name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-display font-bold">
                        ${(product.price / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${product.stock < 5 ? 'text-red-500' : 'text-text-secondary'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditItem(product, 'product')} className="p-2 hover:text-accent transition-colors"><Edit3 size={16} /></button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-muted text-[10px] uppercase tracking-widest font-bold text-text-muted border-b border-border-light">
                    <th className="px-6 py-4">Collection Name</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4">Item Count</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {categories.map(cat => (
                    <tr key={cat.id} className="hover:bg-surface-muted/50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-medium">{cat.name}</td>
                      <td className="px-6 py-4 text-xs font-mono text-text-muted">{cat.slug}</td>
                      <td className="px-6 py-4 text-xs text-text-secondary">
                        {products.filter(p => p.categoryId === cat.id).length} pieces
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditItem(cat, 'category')} className="p-2 hover:text-accent transition-colors"><Edit3 size={16} /></button>
                          <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <Modal 
          title={editingItem ? "Edit Treasure" : "New Acquisition"} 
          onClose={() => setShowProductModal(false)}
        >
          <ProductForm 
            initialData={editingItem} 
            onSubmit={(data) => {
              try {
                if (editingItem) updateProduct(editingItem.id, data);
                else addProduct(data);
                setShowProductModal(false);
                setError('');
              } catch (err) {
                setError(err.message);
              }
            }}
            categories={categories}
          />
        </Modal>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <Modal 
          title={editingItem ? "Refine Collection" : "Define New Collection"} 
          onClose={() => setShowCategoryModal(false)}
        >
          <CategoryForm 
            initialData={editingItem}
            onSubmit={(data) => {
              try {
                if (editingItem) updateCategory(editingItem.id, data);
                else addCategory(data);
                setShowCategoryModal(false);
                setError('');
              } catch (err) {
                setError(err.message);
              }
            }}
          />
        </Modal>
      )}
    </div>
  );
};

// Internal Components for Modal and Forms (simplified for now)
const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-surface w-full max-w-lg border border-border-light shadow-2xl animate-scale-in">
      <div className="flex items-center justify-between p-6 border-b border-border-light">
        <h3 className="text-xl font-display font-bold uppercase tracking-tight">{title}</h3>
        <button onClick={onClose} className="text-text-muted hover:text-primary transition-colors">
          <Trash2 size={20} />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

const CategoryForm = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name }); }} className="space-y-6">
      <div>
        <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-2">Collection Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="input-luxury" 
          placeholder="e.g. Victorian Splendor"
          required 
        />
      </div>
      <button type="submit" className="w-full btn-luxury">
        {initialData ? 'Update Collection' : 'Create Collection'}
      </button>
    </form>
  );
};

const ProductForm = ({ initialData, onSubmit, categories }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: 0,
    categoryId: categories[0]?.id || '',
    image: '',
    stock: 0,
    featured: false,
    description: ''
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-2">Product Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="input-luxury" 
            required 
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-2">Price (in cents)</label>
          <input 
            type="number" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
            className="input-luxury" 
            required 
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-2">Category</label>
          <select 
            value={formData.categoryId} 
            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
            className="w-full bg-transparent border-b border-border-light py-3 outline-none text-sm"
            required
          >
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-2">Image URL</label>
          <input 
            type="text" 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="input-luxury" 
            required 
          />
        </div>
      </div>
      <button type="submit" className="w-full btn-luxury">
        {initialData ? 'Update Treasure' : 'Save Acquisition'}
      </button>
    </form>
  );
};

export default AdminDashboard;
