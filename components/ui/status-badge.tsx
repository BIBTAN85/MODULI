import clsx from 'clsx';

const tones: Record<string, string> = {
  prospect: 'bg-blue-100 text-blue-700',
  actif: 'bg-emerald-100 text-emerald-700',
  a_relancer: 'bg-amber-100 text-amber-700',
  inactif: 'bg-slate-200 text-slate-700',
  en_attente: 'bg-sky-100 text-sky-700',
  relance: 'bg-violet-100 text-violet-700',
  gagne: 'bg-emerald-100 text-emerald-700',
  perdu: 'bg-rose-100 text-rose-700',
  chaud: 'bg-red-100 text-red-700',
  tiede: 'bg-orange-100 text-orange-700',
  froid: 'bg-cyan-100 text-cyan-700'
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={clsx('rounded-full px-2 py-1 text-xs font-medium', tones[value])}>{value.replace('_', ' ')}</span>;
}
