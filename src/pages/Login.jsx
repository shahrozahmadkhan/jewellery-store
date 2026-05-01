import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Diamond, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@luxury.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin@luxury.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-6 pt-20">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Diamond className="text-accent" size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold uppercase tracking-widest mb-2">Private Access</h1>
          <p className="text-text-muted text-xs uppercase tracking-[0.2em]">Authorized Personnel Only</p>
        </div>

        <div className="bg-surface p-8 md:p-10 border border-border-light shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs border-l-2 border-red-500">
                {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted mb-3">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-border-light pl-8 py-3 outline-none transition-all duration-300 focus:border-accent text-sm"
                    placeholder="name@maison.com"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-text-muted mb-3">Password</label>
                <div className="relative">
                  <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-border-light pl-8 py-3 outline-none transition-all duration-300 focus:border-accent text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full btn-luxury flex items-center justify-center gap-3 group">
              Authenticate
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="text-center">
              <button type="button" className="text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors">
                Request Access Credentials
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 text-center">
          <div className="p-4 border border-border-light">
            <p className="text-[9px] uppercase tracking-widest text-text-muted mb-1">Admin Demo</p>
            <p className="text-[10px] font-bold">admin@luxury.com</p>
            <p className="text-[10px] font-bold">admin123</p>
          </div>
          <div className="p-4 border border-border-light">
            <p className="text-[9px] uppercase tracking-widest text-text-muted mb-1">User Demo</p>
            <p className="text-[10px] font-bold">user@luxury.com</p>
            <p className="text-[10px] font-bold">user123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
