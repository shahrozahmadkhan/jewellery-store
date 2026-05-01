import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Diamond, ShieldCheck, Truck, Clock, ArrowRight } from 'lucide-react';

const Home = () => {
  const { products, categories } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  const newArrivals = products.filter(p => !p.featured).slice(0, 4);

  const categoryImages = {
    'necklaces': '/images/andres-vera-202NAwjisYA-unsplash.jpg',
    'rings': '/images/segal-jewelry-NsH-CvU0deg-unsplash.jpg',
    'earrings': '/images/cat-han-Ks6wd1Zyf1o-unsplash.jpg',
    'bracelets': '/images/nataliya-melnychuk-oO0JAOJhquk-unsplash.jpg',
    'watches': '/images/jesus-eca-wewzzx11ShI-unsplash.jpg',
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/max-ducourneau-6uv43p1ePrk-unsplash.jpg" 
            className="w-full h-full object-cover scale-105"
            alt="Jewelry Hero" 
          />
          {/* Subtle gradient to make header visible */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/30 to-primary/40"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 animate-fade-up">
            <Diamond className="text-accent" size={32} />
          </div>
          <h1 className="text-5xl md:text-8xl text-secondary mb-6 leading-tight animate-fade-up" style={{ animationDelay: '200ms' }}>
            Timeless Elegance <br /> <span className="font-light italic">Refined</span>
          </h1>
          <p className="text-secondary/80 text-sm md:text-base uppercase tracking-[0.4em] mb-12 max-w-2xl mx-auto leading-loose animate-fade-up" style={{ animationDelay: '400ms' }}>
            Discover our curated collection of artisanal masterpieces, where heritage meets modern sophistication.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: '600ms' }}>
            <Link to="/shop" className="btn-luxury">Explore Collection</Link>
            <Link to="/about" className="btn-outline-luxury border-secondary! text-secondary! hover:bg-secondary! hover:text-primary!">Our Heritage</Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-secondary/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-accent/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[bounce_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">The Selection</span>
              <h2 className="text-4xl md:text-5xl uppercase tracking-tight">Featured Masterpieces</h2>
            </div>
            <Link to="/shop" className="nav-link border-none">View All Treasures</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Banner Grid */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-4 block">Curated Collections</span>
            <h2 className="text-3xl md:text-4xl uppercase tracking-tight">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link 
                key={cat.id} 
                to={`/shop?category=${cat.id}`}
                className={`relative h-[400px] overflow-hidden group rounded-3xl ${i === 0 ? 'md:col-span-2' : ''} ${i === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <img 
                  src={categoryImages[cat.slug] || '/images/alex-azabache-y2ErhoE92KA-unsplash.jpg'} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={cat.name} 
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all flex flex-col items-center justify-center p-8">
                  <h3 className="text-secondary text-3xl font-display mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">{cat.name}</h3>
                  <div className="w-12 h-px bg-accent mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <span className="text-secondary text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">Explore Collection</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-32 px-6 bg-primary text-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-6 block">Just Arrived</span>
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">The Modern <br /> <span className="font-light italic">Artisan</span> Series</h2>
            <p className="text-secondary/60 mb-10 leading-loose max-w-md">
              Our latest acquisitions feature bold geometric shapes and unconventional gemstone pairings for the modern collector.
            </p>
            <Link to="/shop" className="btn-luxury bg-secondary! text-primary! hover:bg-accent!">Shop New Arrivals</Link>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {newArrivals.map(p => (
              <div key={p.id} className="relative aspect-square overflow-hidden border border-secondary/10 group">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-[9px] uppercase tracking-widest mb-1">{p.name}</p>
                  <p className="text-[10px] font-bold text-accent">${(p.price/100).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 px-6 border-y border-border-light bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { icon: <ShieldCheck size={24} />, title: "Ethically Sourced", desc: "Conflict-free diamonds and recycled gold." },
            { icon: <Diamond size={24} />, title: "Artisan Craft", desc: "Hand-finished by master jewelers." },
            { icon: <Truck size={24} />, title: "White-Glove Delivery", desc: "Insured worldwide shipping on all orders." },
            { icon: <Clock size={24} />, title: "Lifetime Warranty", desc: "We stand behind every piece we create." }
          ].map((item, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="text-accent mb-6">{item.icon}</div>
              <h4 className="text-xs uppercase tracking-widest font-bold mb-3">{item.title}</h4>
              <p className="text-text-muted text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 overflow-hidden">
        <img 
          src="/images/nexaro-studio-vbsN7MUXyT4-unsplash.jpg" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="CTA"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl text-secondary mb-8">Bespoke Creations</h2>
          <p className="text-secondary/80 mb-10 leading-loose">
            Collaborate with our designers to create a one-of-a-kind piece that tells your unique story.
          </p>
          <button className="btn-luxury">Book a Consultation</button>
        </div>
      </section>
    </div>
  );
};

export default Home;

