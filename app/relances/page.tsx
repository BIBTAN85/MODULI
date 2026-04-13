import { PageTitle } from '@/components/ui/page-title';
import { formatDate } from '@/lib/format';
import { getClients, getFollowUps } from '@/lib/repository';

export default async function FollowUpsPage() {
  const [clients, followUps] = await Promise.all([getClients(), getFollowUps()]);
  const clientName = new Map(clients.map((client) => [client.id, client.companyName]));
  const today = new Date('2026-04-13');

  const day = followUps.filter((item) => item.dueDate === '2026-04-13' && !item.done);
  const overdue = followUps.filter((item) => new Date(item.dueDate) < today && !item.done);
  const upcoming = followUps.filter((item) => new Date(item.dueDate) > today && !item.done);

  const renderList = (items: typeof followUps) => (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border bg-white p-3">
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-xs text-slate-500">{clientName.get(item.clientId)} · {formatDate(item.dueDate)}</p>
          <p className="mt-1 text-sm text-slate-600">{item.details}</p>
          <button type="button" className="mt-2 rounded bg-emerald-600 px-3 py-1 text-xs text-white">
            Marquer comme faite
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <PageTitle title="Relances" subtitle="Priorisation des suivis: jour, retard et planification." />

      <div className="mb-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-3">
        <select className="rounded border px-3 py-2">
          <option>Tous secteurs</option>
          <option>44</option>
          <option>49</option>
          <option>85</option>
        </select>
        <input className="rounded border px-3 py-2" placeholder="Filtrer par client" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section>
          <h2 className="mb-2 font-semibold">Relances du jour</h2>
          {renderList(day)}
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-rose-700">Relances en retard</h2>
          {renderList(overdue)}
        </section>
        <section>
          <h2 className="mb-2 font-semibold text-sky-700">Relances à venir</h2>
          {renderList(upcoming)}
        </section>
      </div>
    </div>
  );
}
