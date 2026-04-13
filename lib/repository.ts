import { sampleClients, sampleFollowUps, sampleQuotes, sampleVisits } from '@/lib/sample-data';
import { supabase } from '@/lib/supabase';
import { Client, FollowUp, Quote, Visit } from '@/lib/types';

// NOTE: fallback automatique sur des données locales si Supabase n'est pas configuré.
export async function getClients(): Promise<Client[]> {
  if (!supabase) return sampleClients;
  const { data } = await supabase.from('clients').select('*').order('company_name');
  if (!data) return sampleClients;
  return data.map((row) => ({
    id: row.id,
    companyName: row.company_name,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    address: row.address,
    postalCode: row.postal_code,
    city: row.city,
    sector: row.sector,
    clientType: row.client_type,
    status: row.status,
    notes: row.notes
  }));
}

export async function getVisits(): Promise<Visit[]> {
  if (!supabase) return sampleVisits;
  const { data } = await supabase.from('visits').select('*').order('date', { ascending: false });
  if (!data) return sampleVisits;
  return data.map((row) => ({
    id: row.id,
    clientId: row.client_id,
    date: row.date,
    objective: row.objective,
    report: row.report,
    nextAction: row.next_action,
    nextFollowUpDate: row.next_follow_up_date,
    interestLevel: row.interest_level,
    quoteToSend: row.quote_to_send
  }));
}

export async function getFollowUps(): Promise<FollowUp[]> {
  if (!supabase) return sampleFollowUps;
  const { data } = await supabase.from('follow_ups').select('*').order('due_date');
  if (!data) return sampleFollowUps;
  return data.map((row) => ({
    id: row.id,
    clientId: row.client_id,
    dueDate: row.due_date,
    title: row.title,
    details: row.details,
    done: row.done
  }));
}

export async function getQuotes(): Promise<Quote[]> {
  if (!supabase) return sampleQuotes;
  const { data } = await supabase.from('quotes').select('*').order('sent_at', { ascending: false });
  if (!data) return sampleQuotes;
  return data.map((row) => ({
    id: row.id,
    clientId: row.client_id,
    sentAt: row.sent_at,
    reference: row.reference,
    amount: row.amount,
    status: row.status,
    followUpDate: row.follow_up_date,
    notes: row.notes
  }));
}
