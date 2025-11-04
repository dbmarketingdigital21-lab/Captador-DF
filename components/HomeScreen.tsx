
import React, { useState } from 'react';
import { SearchFilters } from '../types';
import { CITIES, PROPERTY_TYPES, BEDROOMS_OPTIONS } from '../constants';

interface HomeScreenProps {
  onSearch: (filters: SearchFilters) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'Todas',
    type: 'Todos',
    purpose: 'Venda',
    bedrooms: 'Todos',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePurposeChange = (purpose: 'Aluguel' | 'Venda') => {
    setFilters(prev => ({ ...prev, purpose }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const commonSelectClasses = "w-full bg-slate-700 border border-slate-600 text-white rounded-md p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="text-center mb-8 animate-fade-in-down">
        <h1 className="text-5xl md:text-6xl font-bold text-amber-400">Captador DF</h1>
        <p className="text-slate-300 mt-4 text-lg">Encontre imóveis direto com o proprietário em todo o DF.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">Cidade</label>
            <select id="city" name="city" value={filters.city} onChange={handleInputChange} className={commonSelectClasses}>
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-2">Tipo de Imóvel</label>
            <select id="type" name="type" value={filters.type} onChange={handleInputChange} className={commonSelectClasses}>
              {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Finalidade</label>
            <div className="flex rounded-md bg-slate-700 border border-slate-600">
              <button type="button" onClick={() => handlePurposeChange('Venda')} className={`flex-1 p-3 rounded-l-md text-sm font-semibold transition ${filters.purpose === 'Venda' ? 'bg-amber-500 text-slate-900' : 'hover:bg-slate-600'}`}>Venda</button>
              <button type="button" onClick={() => handlePurposeChange('Aluguel')} className={`flex-1 p-3 rounded-r-md text-sm font-semibold transition ${filters.purpose === 'Aluguel' ? 'bg-amber-500 text-slate-900' : 'hover:bg-slate-600'}`}>Aluguel</button>
            </div>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-slate-300 mb-2">Quantidade de Quartos</label>
            <select id="bedrooms" name="bedrooms" value={filters.bedrooms} onChange={handleInputChange} className={commonSelectClasses}>
              {BEDROOMS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}{opt !== 'Todos' && opt !== '5+' ? ' quarto(s)' : ''}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-8">
          <button type="submit" className="w-full bg-amber-500 text-slate-900 font-bold py-3 px-4 rounded-md hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500 transition duration-300 ease-in-out transform hover:scale-105">
            Iniciar Busca
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeScreen;
