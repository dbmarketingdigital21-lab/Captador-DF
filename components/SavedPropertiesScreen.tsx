
import React from 'react';
import { Property, View } from '../types';

interface SavedPropertiesScreenProps {
  savedProperties: Property[];
  onSetView: (view: View) => void;
}

const SavedPropertiesScreen: React.FC<SavedPropertiesScreenProps> = ({ savedProperties, onSetView }) => {
  const exportToCSV = () => {
    const headers = "Cidade;Tipo;Quartos;Preço;Proprietário;Telefone;Fonte;Link";
    const rows = savedProperties.map(prop => 
      [prop.city, prop.type, prop.bedrooms, prop.price, prop.owner, prop.phone, prop.source, prop.link].join(';')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "imoveis_captador_df.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400 mb-4 sm:mb-0">Imóveis Salvos</h1>
          <div className="flex space-x-2">
            <button onClick={() => onSetView('results')} className="bg-slate-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-600 transition">Voltar aos Resultados</button>
            <button 
              onClick={exportToCSV} 
              disabled={savedProperties.length === 0}
              className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400 transition disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed">
              Exportar para .CSV
            </button>
          </div>
        </div>
        
        {savedProperties.length > 0 ? (
          <div className="overflow-x-auto bg-slate-800 rounded-lg border border-slate-700">
            <table className="w-full text-sm text-left text-slate-300">
              <thead className="text-xs text-amber-400 uppercase bg-slate-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Cidade</th>
                  <th scope="col" className="px-6 py-3">Tipo</th>
                  <th scope="col" className="px-6 py-3">Quartos</th>
                  <th scope="col" className="px-6 py-3">Preço</th>
                  <th scope="col" className="px-6 py-3">Proprietário</th>
                  <th scope="col" className="px-6 py-3">Telefone</th>
                  <th scope="col" className="px-6 py-3">Fonte</th>
                  <th scope="col" className="px-6 py-3">Anúncio</th>
                </tr>
              </thead>
              <tbody>
                {savedProperties.map(prop => (
                  <tr key={prop.id} className="border-b border-slate-700 hover:bg-slate-600">
                    <td className="px-6 py-4">{prop.city}</td>
                    <td className="px-6 py-4">{prop.type}</td>
                    <td className="px-6 py-4">{prop.bedrooms}</td>
                    <td className="px-6 py-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(prop.price)}</td>
                    <td className="px-6 py-4">{prop.owner}</td>
                    <td className="px-6 py-4">{prop.phone}</td>
                    <td className="px-6 py-4">{prop.source}</td>
                    <td className="px-6 py-4">
                      <a href={prop.link} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 hover:underline font-semibold">
                        Abrir
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center bg-slate-800 border border-slate-700 rounded-lg p-12">
            <h2 className="text-2xl font-semibold text-white">Nenhum imóvel salvo</h2>
            <p className="text-slate-400 mt-2">Volte para a busca e salve os imóveis que te interessam.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesScreen;
