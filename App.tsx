
import React, { useState, useCallback } from 'react';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultsScreen from './components/ResultsScreen';
import SavedPropertiesScreen from './components/SavedPropertiesScreen';
import { searchProperties } from './services/propertyService';
import { Property, SearchFilters, View } from './types';

function App() {
  const [view, setView] = useState<View>('home');
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  
  const handleSearch = useCallback(async (filters: SearchFilters) => {
    setView('searching');
    const results = await searchProperties(filters);
    setSearchResults(results);
    setView('results');
  }, []);

  const handleSaveProperty = useCallback((propertyToSave: Property) => {
    setSavedProperties(prev => {
      if (prev.find(p => p.id === propertyToSave.id)) {
        return prev; // Already saved
      }
      return [...prev, propertyToSave];
    });
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <HomeScreen onSearch={handleSearch} />;
      case 'searching':
        return <LoadingScreen />;
      case 'results':
        return <ResultsScreen 
                  results={searchResults} 
                  savedProperties={savedProperties}
                  onSaveProperty={handleSaveProperty}
                  onSetView={setView} 
                />;
      case 'saved':
        return <SavedPropertiesScreen 
                  savedProperties={savedProperties}
                  onSetView={setView}
                />;
      default:
        return <HomeScreen onSearch={handleSearch} />;
    }
  };

  return (
    <main className="bg-slate-900 text-white font-sans">
      {renderContent()}
    </main>
  );
}

export default App;
