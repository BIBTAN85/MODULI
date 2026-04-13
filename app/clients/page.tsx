import Link from 'next/link';
import { ClientForm } from '@/components/forms/client-form';
import { PageTitle } from '@/components/ui/page-title';
import { StatusBadge } from '@/components/ui/status-badge';
import { getClients } from '@/lib/repository';

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div>
      <PageTitle title="Clients" subtitle="Gestion des comptes, prospection et qualification." />

      <div className="mb-4 grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-4">
        <input placeholder="Recherche client" className="rounded border px-3 py-2" />
        <select className="rounded border px-3 py-2">
          <option value="">Tous les secteurs</option>
          <option>44</option>
          <option>49</option>
          <option>85</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option value="">Tous les statuts</option>
          <option value="prospect">Prospect</option>
          <option value="actif">Client actif</option>
          <option value="a_relancer">À relancer</option>
          <option value="inactif">Inactif</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="p-3">Entreprise</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Secteur</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-3">{client.companyName}</td>
                <td className="p-3">{client.contactName}</td>
                <td className="p-3">{client.sector}</td>
                <td className="p-3">
                  <StatusBadge value={client.status} />
                </td>
                <td className="p-3">
                  <Link href={`/clients/${client.id}`} className="font-medium text-brand">
                    Ouvrir la fiche
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Créer / modifier un client</h2>
        <ClientForm />
      </div>
    </div>
  );
}
