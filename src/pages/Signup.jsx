import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden flex min-h-[600px] border border-white/50">
        
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary to-orange-600 relative items-center justify-center p-12 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80')] bg-cover bg-center opacity-20"></div>
          
          <div className="relative z-10 max-w-md">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-6">Join Foodela</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Create an account to unlock exclusive offers, track your orders in real-time, and enjoy premium dining at home.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-sm mx-auto w-full"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
            <p className="text-slate-500 mb-8">Start your culinary journey today</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                  placeholder="Full Name"
                />
                <label htmlFor="name" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">Full Name</label>
                <User size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                  placeholder="Email Address"
                />
                <label htmlFor="email" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">Email Address</label>
                <Mail size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 pr-12 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                  placeholder="Password"
                />
                <label htmlFor="password" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">Password</label>
                <Lock size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button disabled={isLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
              </button>
            </form>

            <p className="text-center mt-8 text-slate-500">
              Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;