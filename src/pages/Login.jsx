import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const result = await login(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      showToast('Welcome back!');
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex min-h-[650px] border border-white/60">
        
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-red-600 relative items-center justify-center p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-6">Welcome Back</h1>
              <p className="text-white/90 text-lg leading-relaxed font-medium">
                Access your premium food delivery experience. Your favorite meals are just a click away.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white/40">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-sm mx-auto w-full"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Sign In</h2>
            <p className="text-slate-500 mb-8">Enter your details to continue</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="peer w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-4 pl-11 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent text-slate-800"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-11 -top-2.5 bg-transparent px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary font-medium">Email Address</label>
                <Mail size={20} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="peer w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-4 pl-11 pr-12 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent text-slate-800"
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute left-11 -top-2.5 bg-transparent px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary font-medium">Password</label>
                <Lock size={20} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm font-medium ml-1"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">Forgot Password?</Link>
              </div>

              <button disabled={isLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
              </button>
            </form>

            <p className="text-center mt-8 text-slate-500">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign Up</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;