import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search, ChevronDown } from 'lucide-react';

const Shop = () => {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-40 pb-24 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">The Collections</span>
          <h1 className="text-5xl md:text-6xl uppercase tracking-tight mb-6">Explore Treasures</h1>
          <p className="text-text-muted text-sm max-w-xl mx-auto leading-loose">
            From the depth of the oceans to the heart of the earth, discover our meticulously crafted jewelry collections.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-y border-border-light py-8">
          <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto no-scrollbar">
            <button 
              onClick={() => handleCategoryChange('all')}
              className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${selectedCategory === 'all' ? 'text-accent border-b border-accent pb-1' : 'text-text-muted hover:text-primary'}`}
            >
              All Pieces
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'text-accent border-b border-accent pb-1' : 'text-text-muted hover:text-primary'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search Collection..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-border-light pl-8 py-2 text-xs outline-none focus:border-accent transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted italic">No treasures found matching your criteria.</p>
            <button 
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-6 text-[10px] uppercase tracking-widest font-bold text-accent hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
