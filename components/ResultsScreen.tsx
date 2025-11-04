
import React from 'react';
import { Property, View } from '../types';
import { BuildingIcon, LocationIcon, PriceIcon, UserIcon, PhoneIcon, SourceIcon } from '../constants';

interface ResultsScreenProps {
  results: Property[];
  savedProperties: Property[];
  onSaveProperty: (property: Property) => void;
  onSetView: (view: View) => void;
}

const PropertyCard: React.FC<{ property: Property, isSaved: boolean, onSave: (property: Property) => void }> = ({ property, isSaved, onSave }) => {
    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price);

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-6 flex flex-col justify-between transition-transform transform hover:scale-105 hover:border-amber-400">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-amber-400">{property.type} - {property.purpose}</h3>
                    <span className="text-xs font-semibold bg-slate-700 text-amber-400 py-1 px-3 rounded-full">{property.bedrooms} Qto(s)</span>
                </div>
                <div className="space-y-3 text-slate-300">
                    <p><LocationIcon /> {property.city}</p>
                    <p><PriceIcon /> {formattedPrice}</p>
                    <p><UserIcon /> {property.owner}</p>
                    <p><PhoneIcon /> {property.phone}</p>
                    <p><SourceIcon /> {property.source}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button 
                    onClick={() => onSave(property)}
                    disabled={isSaved}
                    className={`w-full text-sm font-bold py-2 px-4 rounded-md transition ${isSaved ? 'bg-slate-600 text-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'}`}>
                    {isSaved ? 'Salvo' : 'Salvar Imóvel'}
                </button>
                <a href={property.link} target="_blank" rel="noopener noreferrer" className="w-full text-center text-sm bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition">
                    Abrir Anúncio
                </a>
            </div>
        </div>
    );
};


const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, savedProperties, onSaveProperty, onSetView }) => {
    const savedPropertyIds = new Set(savedProperties.map(p => p.id));
    
    return (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-amber-400 mb-4 sm:mb-0">Resultados da Busca</h1>
                    <div className="flex space-x-2">
                        <button onClick={() => onSetView('home')} className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-600 transition">Nova Busca</button>
                        <button onClick={() => onSetView('saved')} className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition">
                            Imóveis Salvos ({savedProperties.length})
                        </button>
                    </div>
                </div>

                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map(prop => (
                            <PropertyCard key={prop.id} property={prop} isSaved={savedPropertyIds.has(prop.id)} onSave={onSaveProperty} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-slate-800 border border-slate-700 rounded-lg p-12">
                        <h2 className="text-2xl font-semibold text-white">Nenhum imóvel encontrado</h2>
                        <p className="text-slate-400 mt-2">Tente ajustar seus filtros de busca para encontrar mais resultados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsScreen;
