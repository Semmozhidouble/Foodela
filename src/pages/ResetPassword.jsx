import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 p-8 md:p-12 relative">
        
        {!isSuccess && (
            <Link to="/login" className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={24} />
            </Link>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {isSuccess ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Password Reset!</h2>
              <p className="text-slate-500 mb-8">
                Your password has been successfully updated. You can now log in with your new password.
              </p>
              <Link to="/login" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto text-primary">
                <Lock size={32} />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Set New Password</h2>
              <p className="text-slate-500 mb-8">Create a strong password for your account.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative text-left">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 pr-12 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                    placeholder="New Password"
                  />
                  <label htmlFor="password" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">New Password</label>
                  <Lock size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="relative text-left">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="peer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 pl-11 pr-12 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-transparent"
                    placeholder="Confirm Password"
                  />
                  <label htmlFor="confirmPassword" className="absolute left-11 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary">Confirm Password</label>
                  <Lock size={18} className="absolute left-4 top-4 text-slate-400 peer-focus:text-primary transition-colors" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

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

export default ResetPassword;