import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { categories } = useStore();
  const category = categories.find(c => c.id === product.categoryId);

  return (
    <div className="group relative animate-fade-up">
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-surface-muted border border-border-light rounded-3xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
          <button className="bg-secondary text-primary p-3 rounded-full hover:bg-accent hover:text-primary transition-all translate-y-4 group-hover:translate-y-0 duration-500">
            <ShoppingCart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-accent text-primary px-3 py-1">Featured</span>
          </div>
        )}

        <button className="absolute top-4 right-4 text-secondary hover:text-accent transition-colors">
          <Heart size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-2">{category?.name}</p>
        <h3 className="font-display text-lg font-light tracking-wide mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="font-display font-bold text-accent">
          ${(product.price / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
