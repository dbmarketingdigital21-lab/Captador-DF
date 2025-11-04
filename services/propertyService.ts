
import { Property, SearchFilters } from '../types';
import { CITIES, PROPERTY_TYPES } from '../constants';

const NAMES = ["Ana Silva", "Bruno Costa", "Carlos Dias", "Daniela Souza", "Eduardo Lima", "Fernanda Alves", "Gustavo Borges", "Helena Correia"];
const SOURCES: Array<'Facebook' | 'Instagram' | 'OLX' | 'Outros'> = ['Facebook', 'Instagram', 'OLX', 'Outros'];

const generateLink = (source: 'Facebook' | 'Instagram' | 'OLX' | 'Outros'): string => {
    const randomId = Math.floor(100000000 + Math.random() * 900000000);
    switch (source) {
        case 'Facebook':
            return `https://www.facebook.com/marketplace/item/${randomId}/`;
        case 'Instagram':
            const shortId = Math.random().toString(36).substring(2, 13);
            return `https://www.instagram.com/p/${shortId}/`;
        case 'OLX':
            return `https://df.olx.com.br/distrito-federal-e-regiao/imoveis/anuncio-especial-${randomId}`;
        case 'Outros':
        default:
            return `https://www.zapimoveis.com.br/imovel/${randomId}/`;
    }
};

const generateMockProperties = (count: number): Property[] => {
    const properties: Property[] = [];
    for (let i = 0; i < count; i++) {
        const purpose: 'Aluguel' | 'Venda' = Math.random() > 0.5 ? 'Venda' : 'Aluguel';
        const type = PROPERTY_TYPES[Math.floor(Math.random() * (PROPERTY_TYPES.length -1)) + 1];
        const bedrooms = Math.floor(Math.random() * 5) + 1;
        
        let price = 0;
        if (purpose === 'Venda') {
            price = 200000 + Math.floor(Math.random() * 800000);
        } else {
            price = 800 + Math.floor(Math.random() * 4200);
        }

        if(type === 'Lote') {
            price = 50000 + Math.floor(Math.random() * 200000);
        }
        
        const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];

        properties.push({
            id: `prop_${Date.now()}_${i}`,
            city: CITIES[Math.floor(Math.random() * (CITIES.length-1)) + 1],
            type,
            purpose,
            bedrooms,
            price,
            owner: NAMES[Math.floor(Math.random() * NAMES.length)],
            phone: `(61) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
            source: source,
            link: generateLink(source)
        });
    }
    return properties;
};

const mockDatabase = generateMockProperties(200);

export const searchProperties = (filters: SearchFilters): Promise<Property[]> => {
    console.log("Buscando com filtros:", filters);

    return new Promise(resolve => {
        setTimeout(() => {
            const results = mockDatabase.filter(prop => {
                const cityMatch = filters.city === 'Todas' || prop.city === filters.city;
                const typeMatch = filters.type === 'Todos' || prop.type === filters.type;
                const purposeMatch = prop.purpose === filters.purpose;
                const bedroomsMatch = filters.bedrooms === 'Todos' || 
                                      (filters.bedrooms === '5+' && prop.bedrooms >= 5) || 
                                      (prop.bedrooms === parseInt(filters.bedrooms, 10));
                
                return cityMatch && typeMatch && purposeMatch && bedroomsMatch;
            });
            resolve(results);
        }, 2000 + Math.random() * 1000); // Simulate network delay
    });
};
