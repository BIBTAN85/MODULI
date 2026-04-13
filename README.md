# Mini CRM Commercial Terrain

Application Next.js + Tailwind + Supabase pour piloter un portefeuille clients terrain.

## Architecture

- `app/`: pages du CRM (dashboard, clients, visites, relances, devis)
- `components/`: layout, UI réutilisable et formulaires
- `lib/`: types, accès données, helpers format
- `supabase/`: schéma SQL + données de seed

## Démarrage

```bash
npm install
npm run dev
```

Variables d'environnement:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Si les variables ne sont pas définies, l'app utilise les données locales de démonstration.

## Base de données

1. Exécuter `supabase/schema.sql`
2. Exécuter `supabase/seed.sql`

## Évolutions conseillées

- authentification utilisateur
- RLS Supabase par commercial
- pipeline Kanban pour devis
- géolocalisation des clients sur carte
- export PDF / CSV des visites et devis
