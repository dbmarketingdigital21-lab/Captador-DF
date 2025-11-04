
export interface Property {
  id: string;
  city: string;
  type: string;
  purpose: 'Aluguel' | 'Venda';
  bedrooms: number;
  price: number;
  owner: string;
  phone: string;
  source: 'Facebook' | 'Instagram' | 'OLX' | 'Outros';
  link: string;
}

export interface SearchFilters {
  city: string;
  type: string;
  purpose: 'Aluguel' | 'Venda';
  bedrooms: string;
}

export type View = 'home' | 'searching' | 'results' | 'saved';
