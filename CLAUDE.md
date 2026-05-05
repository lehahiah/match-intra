# Match-Intra — Instructions pour Claude Code

## Contexte du projet
**Match-Intra** est une application web interne à AEC pour coordonner les formations intra.

**Problème résolu** : AEC doit trouver des dates compatibles entre un établissement client et un intervenant externe pour une formation intra. Aujourd'hui ça se fait par email. Match-Intra envoie des liens sécurisés aux deux parties, recueille leurs disponibilités, et génère automatiquement les meilleures propositions de dates.

**Principe clé** : seul AEC a un compte. L'établissement et l'intervenant accèdent via un lien sécurisé à usage unique — aucune inscription.

---

## Stack technique
- **Framework** : React + Vite, TypeScript
- **Backend / BDD** : Supabase (PostgreSQL + Auth + Realtime)
- **UI** : Tailwind CSS
- **Déploiement** : Vercel (auto depuis GitHub `main`, compte `lehahiah`)

---

## Structure des dossiers
```
src/
  components/
    dashboard/      ← SessionCard, StatusBadge, DashboardStats
    sessions/       ← SessionForm, SessionDetailHeader, ParticipantResponseCard
    availability/   ← AvailabilityPicker, AvailabilitySummary, DateSlotSelector
    proposals/      ← ProposalList, ProposalCard
    public/         ← PublicSessionHeader, PublicResponseLayout
    ui/             ← Button, Card, Input, Select, Textarea, StatusBadge
  lib/
    supabase.ts     ← client Supabase unique
    matching.ts     ← moteur de matching (logique pure, testable)
    dates.ts        ← utilitaires de dates
    status.ts       ← labels et couleurs des statuts
  pages/
    Login.tsx
    Dashboard.tsx
    SessionNew.tsx
    SessionDetail.tsx
    EstablishmentResponse.tsx
    TrainerResponse.tsx
    Thanks.tsx
  types/
    database.ts     ← types générés / calqués sur le schéma Supabase
    session.ts
    availability.ts
    proposal.ts
supabase/
  migrations/       ← SQL versionnée, jamais modifier sans nouvelle migration
```

---

## Routes
```
/login                      ← AEC uniquement
/dashboard                  ← AEC, protégée
/sessions/new               ← AEC, protégée
/sessions/:id               ← AEC, protégée
/r/establishment/:token     ← publique, sans compte
/r/trainer/:token           ← publique, sans compte
/thanks                     ← publique
```

---

## Variables d'environnement
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
Fichier `.env.local` — jamais committé. Modèle dans `.env.local.example`.

---

## Règles de travail
- Toute modification de schéma → nouvelle migration dans `supabase/migrations/`
- Le matching est une fonction pure dans `lib/matching.ts` — pas d'appels Supabase dedans
- Les statuts et leurs libellés sont centralisés dans `lib/status.ts`
- Types TypeScript stricts — pas de `any`
- Les pages publiques (`/r/...`) chargent la session via token uniquement — pas d'auth
- Vérifier le build Vercel après chaque push sur `main`

---

## Démarrage de session
1. Lire `tasks/session_recap.md`
2. Lire `tasks/lessons.md`
3. Lire `tasks/todo.md`
4. Vérifier l'état du build Vercel

---

## Fin de session
Mettre à jour `tasks/session_recap.md` avec : état build, ce qui a été fait, fichiers modifiés, prochaines étapes.
