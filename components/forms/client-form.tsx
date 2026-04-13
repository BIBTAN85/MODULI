export function ClientForm() {
  return (
    <form className="grid gap-3 rounded-xl border bg-white p-4 md:grid-cols-2">
      <input className="rounded border px-3 py-2" placeholder="Entreprise" />
      <input className="rounded border px-3 py-2" placeholder="Contact" />
      <input className="rounded border px-3 py-2" placeholder="Téléphone" />
      <input className="rounded border px-3 py-2" placeholder="Email" type="email" />
      <input className="rounded border px-3 py-2 md:col-span-2" placeholder="Adresse" />
      <input className="rounded border px-3 py-2" placeholder="Code postal" />
      <input className="rounded border px-3 py-2" placeholder="Ville" />
      <button type="button" className="rounded bg-brand px-4 py-2 text-white md:col-span-2 md:justify-self-start">
        Enregistrer
      </button>
    </form>
  );
}
