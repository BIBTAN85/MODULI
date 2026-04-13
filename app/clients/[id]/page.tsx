import { notFound } from 'next/navigation';
import { PageTitle } from '@/components/ui/page-title';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatCurrency, formatDate } from '@/lib/format';
import { getClients, getFollowUps, getQuotes, getVisits } from '@/lib/repository';

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [clients, visits, followUps, quotes] = await Promise.all([
    getClients(),
    getVisits(),
    getFollowUps(),
    getQuotes()
  ]);

  const client = clients.find((item) => item.id === id);
  if (!client) notFound();

  const clientVisits = visits.filter((visit) => visit.clientId === id);
  const clientFollowUps = followUps.filter((followUp) => followUp.clientId === id);
  const clientQuotes = quotes.filter((quote) => quote.clientId === id);

  return (
    <div>
      <PageTitle title={client.companyName} subtitle={`${client.contactName} · ${client.city} (${client.sector})`} />

      <section className="mb-4 rounded-xl border bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">{client.email} · {client.phone}</p>
          <StatusBadge value={client.status} />
        </div>
        <p className="mt-2 text-sm text-slate-500">{client.address}, {client.postalCode} {client.city}</p>
        <p className="mt-3 text-sm">{client.notes}</p>
      </section>

      <section className="mb-4 rounded-xl border bg-white p-4">
        <h2 className="mb-3 font-semibold">Historique des visites</h2>
        <div className="grid gap-3">
          {clientVisits.map((visit) => (
            <div key={visit.id} className="rounded-lg border p-3">
              <p className="text-sm font-medium">{formatDate(visit.date)} · {visit.objective}</p>
              <p className="text-sm text-slate-600">{visit.report}</p>
              <p className="mt-1 text-xs text-slate-500">Prochaine action : {visit.nextAction} ({formatDate(visit.nextFollowUpDate)})</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4 rounded-xl border bg-white p-4">
        <h2 className="mb-3 font-semibold">Relances</h2>
        <ul className="space-y-2 text-sm">
          {clientFollowUps.map((item) => (
            <li key={item.id} className="rounded-lg border p-3">
              {formatDate(item.dueDate)} · {item.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-white p-4">
        <h2 className="mb-3 font-semibold">Devis liés</h2>
        <ul className="space-y-2 text-sm">
          {clientQuotes.map((quote) => (
            <li key={quote.id} className="rounded-lg border p-3">
              {quote.reference} · {formatCurrency(quote.amount)} · <StatusBadge value={quote.status} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
