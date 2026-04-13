import { PageTitle } from '@/components/ui/page-title';
import { StatCard } from '@/components/ui/stat-card';
import { getClients, getFollowUps, getQuotes, getVisits } from '@/lib/repository';

export default async function DashboardPage() {
  const [clients, followUps, quotes, visits] = await Promise.all([
    getClients(),
    getFollowUps(),
    getQuotes(),
    getVisits()
  ]);

  const thisMonth = new Date().toISOString().slice(0, 7);
  const visitsMonth = visits.filter((visit) => visit.date.startsWith(thisMonth)).length;
  const prospects = clients.filter((client) => client.status === 'prospect').length;
  const pendingFollowUps = followUps.filter((followUp) => !followUp.done).length;
  const pendingQuotes = quotes.filter((quote) => quote.status === 'en_attente').length;
  const bySector = ['44', '49', '85'].map((sector) => ({
    sector,
    count: clients.filter((client) => client.sector === sector).length
  }));

  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Suivi rapide de votre activité commerciale terrain." />
      <section className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total clients" value={clients.length} />
        <StatCard label="Prospects" value={prospects} />
        <StatCard label="Visites du mois" value={visitsMonth} />
        <StatCard label="Relances en attente" value={pendingFollowUps} />
        <StatCard label="Devis en attente" value={pendingQuotes} />
      </section>

      <section className="mt-6 rounded-xl border bg-white p-4">
        <h2 className="mb-4 font-semibold">Répartition par secteur</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {bySector.map((entry) => (
            <div key={entry.sector} className="rounded-lg bg-slate-100 p-3 text-center">
              <p className="text-sm text-slate-500">Secteur {entry.sector}</p>
              <p className="text-xl font-semibold">{entry.count}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
