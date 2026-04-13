insert into clients (id, company_name, contact_name, phone, email, address, postal_code, city, sector, client_type, status, notes)
values
  ('11111111-1111-1111-1111-111111111111', 'Atlantique Travaux', 'Marie Dubois', '06 12 34 56 78', 'marie@atlantique-travaux.fr', '12 rue des Forges', '44000', 'Nantes', '44', 'PME BTP', 'actif', 'Très bon relationnel, sensible aux délais de livraison.'),
  ('22222222-2222-2222-2222-222222222222', 'LogiOuest', 'Thomas Girard', '06 89 45 11 20', 't.girard@logiouest.fr', '4 avenue des Tilleuls', '49000', 'Angers', '49', 'Logistique', 'prospect', 'Première visite positive, en attente d’un chiffrage.'),
  ('33333333-3333-3333-3333-333333333333', 'Vendée Habitat', 'Camille Robert', '07 55 21 90 44', 'camille.robert@vendeehabitat.fr', '3 place de la Liberté', '85000', 'La Roche-sur-Yon', '85', 'Collectivité', 'a_relancer', 'Relance à faire sur projet rénovation T3.');

insert into visits (client_id, date, objective, report, next_action, next_follow_up_date, interest_level, quote_to_send)
values
  ('11111111-1111-1111-1111-111111111111', '2026-04-08', 'Revue des besoins Q2', 'Demande ferme sur 2 lots supplémentaires.', 'Envoyer proposition mise à jour', '2026-04-15', 'chaud', true),
  ('22222222-2222-2222-2222-222222222222', '2026-04-10', 'Découverte et qualification', 'Budget validé, décision fin du mois.', 'Appel de suivi', '2026-04-20', 'tiede', true);

insert into follow_ups (client_id, due_date, title, details, done)
values
  ('11111111-1111-1111-1111-111111111111', '2026-04-13', 'Validation du devis complémentaire', 'Confirmer les quantités et date de lancement.', false),
  ('33333333-3333-3333-3333-333333333333', '2026-04-11', 'Relance téléphonique projet T3', 'Reprendre contact avec le service achat.', false),
  ('22222222-2222-2222-2222-222222222222', '2026-04-20', 'Point décision', 'Valider l’accord final.', false);

insert into quotes (client_id, sent_at, reference, amount, status, follow_up_date, notes)
values
  ('11111111-1111-1111-1111-111111111111', '2026-04-09', 'DEV-2026-041', 12450, 'en_attente', '2026-04-14', 'Marge préservée à 22%.'),
  ('22222222-2222-2222-2222-222222222222', '2026-04-10', 'DEV-2026-042', 8600, 'relance', '2026-04-18', 'Option premium à arbitrer.');
