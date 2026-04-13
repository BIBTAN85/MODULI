import { PageTitle } from '@/components/ui/page-title';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatDate } from '@/lib/format';
import { getClients, getVisits } from '@/lib/repository';

export default async function VisitsPage() {
  const [clients, visits] = await Promise.all([getClients(), getVisits()]);
  const clientsMap = new Map(clients.map((client) => [client.id, client]));

  return (
    <div>
      <PageTitle title="Visites" subtitle="Compte-rendu de rendez-vous et suivi de l’intérêt commercial." />
      <div className="space-y-3">
        {visits.map((visit) => (
          <article key={visit.id} className="rounded-xl border bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold">{clientsMap.get(visit.clientId)?.companyName}</h2>
              <span className="text-sm text-slate-500">{formatDate(visit.date)}</span>
            </div>
            <p className="text-sm"><strong>Objectif :</strong> {visit.objective}</p>
            <p className="text-sm text-slate-600"><strong>Compte-rendu :</strong> {visit.report}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <StatusBadge value={visit.interestLevel} />
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">
                Prochaine relance : {formatDate(visit.nextFollowUpDate)}
              </span>
              {visit.quoteToSend && <span className="rounded-full bg-brand-light px-2 py-1 text-xs text-brand">Devis à envoyer</span>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
