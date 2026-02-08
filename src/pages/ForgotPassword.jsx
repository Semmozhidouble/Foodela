import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 p-8 md:p-12 relative">
        
        <Link to="/login" className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors">
          <ArrowLeft size={24} />
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Check your email</h2>
              <p className="text-slate-500 mb-8">
                We've sent password reset instructions to <span className="font-bold text-slate-700">{email}</span>
              </p>
              <Link to="/login" className="w-full bg-slate-100 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                <Mail size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
              <p className="text-slate-500 mb-8">No worries, we'll send you reset instructions.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative text-left">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                    placeholder="Email Address"
                  />
                  <label htmlFor="email" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">Email Address</label>
                  <Mail size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
                </div>

                <button disabled={isLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {isLoading ? <Loader2 size={20} className="animate-spin" /> : <>Reset Password <ArrowRight size={20} /></>}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;