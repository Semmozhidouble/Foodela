import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-4 h-[340px] animate-pulse flex flex-col gap-4">
      <div className="w-full h-48 bg-slate-200/50 rounded-2xl"></div>
      <div className="flex-1 space-y-4 p-2">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-slate-200/50 rounded-lg w-3/5"></div>
          <div className="h-6 bg-slate-200/50 rounded-lg w-12"></div>
        </div>
        <div className="h-4 bg-slate-200/50 rounded-lg w-full"></div>
        <div className="h-4 bg-slate-200/50 rounded-lg w-2/3"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;