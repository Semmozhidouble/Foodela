import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

const OrderTracker = ({ currentStep }) => {
  return (
    <div className="w-full py-6 px-2">
      <div className="relative flex justify-between items-center">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0" />
        
        {/* Active Progress Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2 w-1/4">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted || isActive ? '#FF4B3A' : '#FFFFFF',
                  borderColor: isCompleted || isActive ? '#FF4B3A' : '#E2E8F0'
                }}
                className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-colors duration-300 bg-white ${isActive ? 'shadow-glow' : ''}`}
              >
                {isCompleted && <Check size={14} className="text-white" />}
                {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
              </motion.div>
              <span className={`text-[10px] md:text-xs font-medium absolute -bottom-8 text-center w-24 ${isActive || isCompleted ? 'text-slate-800' : 'text-slate-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;