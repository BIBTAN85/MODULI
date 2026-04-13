import { PageTitle } from '@/components/ui/page-title';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatCurrency, formatDate } from '@/lib/format';
import { getClients, getQuotes } from '@/lib/repository';

export default async function QuotesPage() {
  const [clients, quotes] = await Promise.all([getClients(), getQuotes()]);
  const clientMap = new Map(clients.map((client) => [client.id, client.companyName]));

  return (
    <div>
      <PageTitle title="Devis" subtitle="Pipeline des propositions envoyées et taux de conversion." />
      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="p-3">Référence</th>
              <th className="p-3">Client</th>
              <th className="p-3">Envoi</th>
              <th className="p-3">Montant</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Relance prévue</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t">
                <td className="p-3">{quote.reference}</td>
                <td className="p-3">{clientMap.get(quote.clientId)}</td>
                <td className="p-3">{formatDate(quote.sentAt)}</td>
                <td className="p-3">{formatCurrency(quote.amount)}</td>
                <td className="p-3"><StatusBadge value={quote.status} /></td>
                <td className="p-3">{formatDate(quote.followUpDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
