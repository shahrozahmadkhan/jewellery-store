import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Shop from './pages/Shop';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Router>
          <div className="min-h-screen bg-secondary flex flex-col">
            <Navbar />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Fallback to Home for now */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

const Footer = () => (
  <footer className="bg-primary text-secondary py-20 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="col-span-1 md:col-span-2">
        <h3 className="font-display text-2xl tracking-[0.2em] mb-8 uppercase">AURELIUS</h3>
        <p className="text-secondary/60 text-sm leading-loose max-w-md mb-8">
          Crafting moments into eternity. Our boutique specializes in rare gemstones and artisanal metalwork, maintaining the highest standards of luxury since 1924.
        </p>
        <div className="flex gap-6">
          {['Instagram', 'Pinterest', 'LinkedIn'].map(social => (
            <a key={social} href="#" className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors">{social}</a>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Boutique</h4>
        <ul className="space-y-4 text-sm text-secondary/60">
          <li><a href="#" className="hover:text-secondary transition-colors">Our Story</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Collections</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Bespoke Service</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Care Guide</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Assistance</h4>
        <ul className="space-y-4 text-sm text-secondary/60">
          <li><a href="#" className="hover:text-secondary transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Size Guide</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Contact Us</a></li>
          <li><a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[10px] uppercase tracking-widest text-secondary/40">© 2024 Aurelius Fine Jewelry. All Rights Reserved.</p>
      <p className="text-[10px] uppercase tracking-widest text-secondary/40 italic text-center md:text-right">Designed for the Discerning.</p>
    </div>
  </footer>
);

export default App;
