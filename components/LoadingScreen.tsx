
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-amber-400"></div>
      <h2 className="text-2xl font-semibold text-amber-400 mt-8">Buscando imóveis...</h2>
      <p className="text-slate-400 mt-2">Estamos vasculhando as melhores oportunidades para você!</p>
    </div>
  );
};

export default LoadingScreen;
