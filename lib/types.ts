export type Sector = '44' | '49' | '85';
export type ClientStatus = 'prospect' | 'actif' | 'a_relancer' | 'inactif';
export type InterestLevel = 'chaud' | 'tiede' | 'froid';
export type QuoteStatus = 'en_attente' | 'relance' | 'gagne' | 'perdu';

export interface Client {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  sector: Sector;
  clientType: string;
  status: ClientStatus;
  notes: string;
}

export interface Visit {
  id: string;
  clientId: string;
  date: string;
  objective: string;
  report: string;
  nextAction: string;
  nextFollowUpDate: string;
  interestLevel: InterestLevel;
  quoteToSend: boolean;
}

export interface FollowUp {
  id: string;
  clientId: string;
  dueDate: string;
  title: string;
  details: string;
  done: boolean;
}

export interface Quote {
  id: string;
  clientId: string;
  sentAt: string;
  reference: string;
  amount: number;
  status: QuoteStatus;
  followUpDate: string;
  notes: string;
}
