import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, LogOut, Menu, X, Diamond } from 'lucide-react';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'bg-white py-4 shadow-sm' : 'max-md:bg-white max-md:py-4 max-md:shadow-sm bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button className={`md:hidden ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Links Left */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`nav-link ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary!' : 'text-white!'}`}>Home</Link>
          <Link to="/shop" className={`nav-link ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary!' : 'text-white!'}`}>Collections</Link>
          <Link to="/about" className={`nav-link ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary!' : 'text-white!'}`}>Heritage</Link>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center group">
          <div className="flex items-center gap-2">
            <Diamond className="text-accent group-hover:rotate-45 transition-transform duration-700" size={18} />
            <span className={`font-display text-2xl tracking-[0.2em] font-light uppercase ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary' : 'text-white'}`}>AURELIUS</span>
          </div>
          <span className={`text-[10px] tracking-[0.4em] uppercase mt-1 ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-text-muted' : 'text-white/60'}`}>Fine Jewelry</span>
        </Link>

        {/* Links Right */}
        <div className="flex items-center gap-6">
          {isAdmin && (
            <Link to="/admin" className={`hidden md:block nav-link text-accent ${(isScrolled || isMobileMenuOpen || isMobile) ? '' : 'text-accent!'}`}>Admin</Link>
          )}
          <div className="flex items-center gap-4">
            <button className={`${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary' : 'text-white'} hover:text-accent transition-colors`}>
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`hidden sm:inline text-[10px] uppercase tracking-widest ${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-text-muted' : 'text-white/60'}`}>Hello, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className={`${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary' : 'text-white'} hover:text-accent transition-colors`}>
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={`${(isScrolled || isMobileMenuOpen || isMobile) ? 'text-primary' : 'text-white'} hover:text-accent transition-colors`}>
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-border-light p-8 flex flex-col gap-6 animate-fade-in shadow-xl">
          <Link to="/" className="nav-link text-primary! text-center" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="nav-link text-primary! text-center" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          <Link to="/about" className="nav-link text-primary! text-center" onClick={() => setIsMobileMenuOpen(false)}>Heritage</Link>
          {isAdmin && (
            <Link to="/admin" className="nav-link text-accent! text-center font-bold" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
