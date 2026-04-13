import { Client, FollowUp, Quote, Visit } from '@/lib/types';

export const sampleClients: Client[] = [
  {
    id: 'cli_1',
    companyName: 'Atlantique Travaux',
    contactName: 'Marie Dubois',
    phone: '06 12 34 56 78',
    email: 'marie@atlantique-travaux.fr',
    address: '12 rue des Forges',
    postalCode: '44000',
    city: 'Nantes',
    sector: '44',
    clientType: 'PME BTP',
    status: 'actif',
    notes: 'Très bon relationnel, sensible aux délais de livraison.'
  },
  {
    id: 'cli_2',
    companyName: 'LogiOuest',
    contactName: 'Thomas Girard',
    phone: '06 89 45 11 20',
    email: 't.girard@logiouest.fr',
    address: '4 avenue des Tilleuls',
    postalCode: '49000',
    city: 'Angers',
    sector: '49',
    clientType: 'Logistique',
    status: 'prospect',
    notes: 'Première visite positive, en attente d’un chiffrage.'
  },
  {
    id: 'cli_3',
    companyName: 'Vendée Habitat',
    contactName: 'Camille Robert',
    phone: '07 55 21 90 44',
    email: 'camille.robert@vendeehabitat.fr',
    address: '3 place de la Liberté',
    postalCode: '85000',
    city: 'La Roche-sur-Yon',
    sector: '85',
    clientType: 'Collectivité',
    status: 'a_relancer',
    notes: 'Relance à faire sur projet rénovation T3.'
  }
];

export const sampleVisits: Visit[] = [
  {
    id: 'vis_1',
    clientId: 'cli_1',
    date: '2026-04-08',
    objective: 'Revue des besoins Q2',
    report: 'Demande ferme sur 2 lots supplémentaires.',
    nextAction: 'Envoyer proposition mise à jour',
    nextFollowUpDate: '2026-04-15',
    interestLevel: 'chaud',
    quoteToSend: true
  },
  {
    id: 'vis_2',
    clientId: 'cli_2',
    date: '2026-04-10',
    objective: 'Découverte et qualification',
    report: 'Budget validé, décision fin du mois.',
    nextAction: 'Appel de suivi',
    nextFollowUpDate: '2026-04-20',
    interestLevel: 'tiede',
    quoteToSend: true
  }
];

export const sampleFollowUps: FollowUp[] = [
  {
    id: 'fol_1',
    clientId: 'cli_1',
    dueDate: '2026-04-13',
    title: 'Validation du devis complémentaire',
    details: 'Confirmer les quantités et date de lancement.',
    done: false
  },
  {
    id: 'fol_2',
    clientId: 'cli_3',
    dueDate: '2026-04-11',
    title: 'Relance téléphonique projet T3',
    details: 'Reprendre contact avec le service achat.',
    done: false
  },
  {
    id: 'fol_3',
    clientId: 'cli_2',
    dueDate: '2026-04-20',
    title: 'Point décision',
    details: 'Valider l’accord final.',
    done: false
  }
];

export const sampleQuotes: Quote[] = [
  {
    id: 'quo_1',
    clientId: 'cli_1',
    sentAt: '2026-04-09',
    reference: 'DEV-2026-041',
    amount: 12450,
    status: 'en_attente',
    followUpDate: '2026-04-14',
    notes: 'Marge préservée à 22%.'
  },
  {
    id: 'quo_2',
    clientId: 'cli_2',
    sentAt: '2026-04-10',
    reference: 'DEV-2026-042',
    amount: 8600,
    status: 'relance',
    followUpDate: '2026-04-18',
    notes: 'Option premium à arbitrer.'
  }
];
