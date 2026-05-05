# Tasks — Match Intra

### TODO

#### Phase 0 — Préparation ✅ (structure créée le 2026-05-05)
- [x] Créer la structure du projet (React + Vite + TS + Tailwind)
- [x] Créer les types TypeScript complets (database.ts, session.ts, availability.ts, proposal.ts)
- [x] Créer les bibliothèques utilitaires (supabase.ts, status.ts, dates.ts, matching.ts)
- [x] Créer les composants UI de base (Button, Card, Input, Select, Textarea, StatusBadge)
- [x] Créer la page Login fonctionnelle
- [x] Créer les stubs de toutes les pages
- [x] Créer la migration SQL initiale
- [ ] Créer le repo GitHub (compte lehahiah)
- [ ] Créer le projet Supabase + appliquer la migration
- [ ] Connecter le repo à Vercel

#### Phase 1 — Base Supabase
- [ ] Appliquer 001_initial_schema.sql sur le projet Supabase
- [ ] Vérifier les RLS policies (test avec un utilisateur anonyme)
- [ ] Créer l'utilisateur AEC dans Supabase Auth
- [ ] Remplir .env.local avec les vraies clés

#### Phase 2 — Front skeleton
- [ ] Vérifier que toutes les routes sont accessibles
- [ ] Tester la connexion Login → Dashboard
- [ ] Tester la redirection des routes protégées

#### Phase 3 — Création de session
- [ ] Implémenter SessionNew.tsx (formulaire complet)
- [ ] Générateur de tokens (uuid v4 ou gen_random_bytes côté Supabase)
- [ ] Envoi de la session + génération des liens

#### Phase 4 — Pages publiques
- [ ] EstablishmentResponse.tsx : AvailabilityPicker + submit
- [ ] TrainerResponse.tsx : AvailabilityPicker + préférences + date limite + submit
- [ ] Mise à jour du statut session après soumission

#### Phase 5 — Moteur de matching
- [ ] Connecter lib/matching.ts aux données Supabase
- [ ] Tester les 4 cas (full_day/half_day × continuous/discontinuous)
- [ ] Insérer les proposals dans Supabase
- [ ] Mettre à jour sessions.status

#### Phase 6 — Dashboard
- [ ] SessionCard.tsx avec tous les champs
- [ ] DashboardStats.tsx (compteurs)
- [ ] Filtres par statut
- [ ] Relance établissement / intervenant

#### Phase 7 — Détail session
- [ ] SessionDetail.tsx complet
- [ ] ProposalCard.tsx avec score et CompatibilityBadge
- [ ] Validation d'une proposition → confirmed

#### Phase 8 — Notifications email
- [ ] Choisir le service email (Resend ou Supabase Edge Function + SMTP)
- [ ] Template email lien établissement
- [ ] Template email lien intervenant
- [ ] Notification AEC quand les deux ont répondu
- [ ] Notification confirmation

#### Phase 9 — Nettoyage
- [ ] Responsive mobile — toutes les pages publiques
- [ ] États vides (dashboard sans sessions, session sans réponses)
- [ ] Page erreur token invalide
- [ ] Vérifier tous les champs obligatoires

#### Phase 10 — Tests métier
- [ ] 1 jour journée complète continu
- [ ] 2 jours journée complète continu
- [ ] 3 jours journée complète discontinu
- [ ] 1 jour demi-journées discontinu
- [ ] Aucun match
- [ ] keep_until expiré
- [ ] Préférence idéale dominante
- [ ] Préférence à confirmer dominante

### EN COURS

### TERMINÉ
