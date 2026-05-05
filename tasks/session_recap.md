# Session recap — 2026-05-05 (HANDOFF)

## État du projet
**Phase 0 terminée.** Repo local complet, aucun push GitHub encore effectué.
Build non testé (npm install non lancé) — à faire avant tout.

---

## Structure du projet

```
match-intra/
├── CLAUDE.md                     ← règles de travail, stack, routes
├── README.md                     ← description projet
├── package.json                  ← React 18 + Vite 5 + TS + Tailwind + Supabase + date-fns + react-router-dom v6
├── vite.config.ts                ← alias @ → src/
├── tsconfig.json + tsconfig.node.json
├── tailwind.config.ts            ← couleur primary (sky)
├── postcss.config.js
├── index.html
├── .gitignore                    ← node_modules, dist, .env.local
├── .env.local.example            ← VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
├── vercel.json                   ← rewrite /* → /index.html (SPA routing)
├── src/
│   ├── main.tsx
│   ├── App.tsx                   ← createBrowserRouter, toutes les routes câblées
│   ├── index.css                 ← @tailwind directives
│   ├── types/
│   │   ├── database.ts           ← tous les types calqués sur le schéma SQL
│   │   ├── session.ts            ← SessionWithResponses, NewSessionFormData
│   │   ├── availability.ts       ← AvailabilitySubmission, AvailabilityDay
│   │   └── proposal.ts           ← MatchUnit, ProposalCandidate, MatchingInput
│   ├── lib/
│   │   ├── supabase.ts           ← createClient (VITE_ env vars)
│   │   ├── status.ts             ← labels + couleurs Tailwind pour tous les statuts
│   │   ├── dates.ts              ← formatDate, getDaysInPeriod, isKeepUntilExpired, computeTotalUnits
│   │   └── matching.ts           ← moteur complet (4 modes, scoring 0-100, 5 propositions max)
│   ├── components/
│   │   ├── auth/ProtectedRoute.tsx   ← vérifie supabase.auth.getSession()
│   │   ├── ui/
│   │   │   ├── Button.tsx            ← variants primary/secondary/ghost/danger, loading spinner
│   │   │   ├── Card.tsx              ← Card + CardHeader + CardBody
│   │   │   ├── Input.tsx             ← label + error
│   │   │   ├── Select.tsx            ← label + error + options[]
│   │   │   ├── Textarea.tsx          ← label + error
│   │   │   └── StatusBadge.tsx       ← SessionStatusBadge, ResponseStatusBadge, CompatibilityBadge
│   │   ├── dashboard/SessionCard.tsx     ← STUB (Phase 6)
│   │   ├── availability/AvailabilityPicker.tsx ← STUB (Phase 4)
│   │   └── proposals/ProposalCard.tsx    ← STUB (Phase 7)
│   └── pages/
│       ├── Login.tsx             ← FONCTIONNEL (email+password → supabase.auth.signInWithPassword)
│       ├── Dashboard.tsx         ← STUB (Phase 6)
│       ├── SessionNew.tsx        ← STUB (Phase 3)
│       ├── SessionDetail.tsx     ← STUB (Phase 7)
│       ├── EstablishmentResponse.tsx ← token loading + erreurs (Phase 4 pour le formulaire)
│       ├── TrainerResponse.tsx       ← token loading + erreurs (Phase 4 pour le formulaire)
│       └── Thanks.tsx            ← FONCTIONNEL (page de confirmation)
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql ← schéma complet + RLS + données initiales programs
├── tasks/
│   ├── todo.md                   ← roadmap 10 phases avec cases à cocher
│   ├── lessons.md
│   └── session_recap.md          ← ce fichier
└── docs/
    01 à 08 *.md                  ← specs complètes (voir ci-dessous)
```

---

## Specs dans les docs (résumé clé)

### Acteurs
- **AEC** : seul utilisateur authentifié. Crée les sessions, suit, valide.
- **Établissement** : accès public par token, aucun compte. Renseigne ses dispos.
- **Intervenant** : accès public par token, aucun compte. Renseigne dispos + préférences + date limite de maintien.

### Modèle de données (6 tables)
| Table | Rôle |
|---|---|
| `programs` | Catalogue formations (SST, gestes postures…) |
| `sessions` | Une demande de coordination. Statuts : draft → sent → partial_response → complete_responses → match_found / no_match → confirmed → closed |
| `access_tokens` | Liens sécurisés pour établissement et intervenant. token = hex 32 bytes |
| `participant_responses` | Réponse globale par participant (statuts : not_started → in_progress → submitted) |
| `availabilities` | Créneaux unitaires (date + morning/afternoon). 1 journée = 2 lignes |
| `proposals` | Propositions générées par le moteur. Max 5, triées par score |

### Règles métier clés
- `duration_days` ∈ {1, 2, 3} → `total_units` = duration_days × 2
- `slot_mode` : full_day (matin+après-midi) ou half_day (demi-journées séparées)
- `scheduling_mode` : continuous (consécutif) ou discontinuous (libre)
- Préférence intervenant : ideal (+25 pts) / possible (+15 pts) / confirm_later (+5 pts)
- Préférence spécifique écrase la préférence globale
- `keep_until` dépassé → créneau exclu du matching
- Score plafonné à 100 — strong ≥ 80, medium ≥ 60, fragile < 60

### Moteur de matching (`src/lib/matching.ts`)
Implémenté en entier. Algorithme :
1. Filtrer les dispos valides (is_available + keep_until non expiré)
2. Résoudre les préférences (spécifique > globale)
3. Intersection établissement ∩ intervenant
4. Regrouper selon slot_mode (journées entières ou demi-journées)
5. Générer combinaisons selon scheduling_mode (séquences consécutives ou combinatoires)
6. Scorer chaque proposition (base 50 + préférence + stabilité + cohérence chronologique)
7. Retourner top 5 triés par score desc

### Routes
```
/login                      AEC — auth
/dashboard                  AEC — protégée
/sessions/new               AEC — protégée
/sessions/:id               AEC — protégée
/r/establishment/:token     Public
/r/trainer/:token           Public
/thanks                     Public
```

---

## Ce qu'il reste à faire (dans l'ordre)

### Immédiat — Mise en service
1. **Créer le repo GitHub** sur le compte `lehahiah` (repo public ou privé)
   ```bash
   git init
   git add .
   git commit -m "feat: Phase 0 — structure initiale"
   git remote add origin https://github.com/lehahiah/match-intra.git
   git push -u origin main
   ```
2. **Créer le projet Supabase**
   - Région EU (RGPD)
   - Appliquer `supabase/migrations/001_initial_schema.sql` dans l'éditeur SQL
   - Créer l'utilisateur AEC : Authentication → Users → Invite user
   - Copier URL + anon key dans `.env.local`
3. **Connecter à Vercel**
   - Import depuis GitHub `lehahiah/match-intra`
   - Framework détecté automatiquement : Vite
   - Ajouter les variables d'env Supabase dans Vercel
4. **Tester** : `npm install` + `npm run dev` → Login doit fonctionner

### Phase 3 — Création de session (`SessionNew.tsx`)
Formulaire avec tous ces champs :
- Formation (liste `programs` + champ libre "Autre")
- Établissement (nom + email)
- Intervenant (nom + email)
- Lieu
- Période (date début / date fin)
- Durée (1, 2, 3 jours) → calcule total_units automatiquement
- Mode (continu / discontinu)
- Format (journée complète / demi-journée)
- Commentaire établissement
- Commentaire intervenant

Actions : Enregistrer brouillon + Envoyer (génère les tokens et crée les lignes `access_tokens`)

### Phase 4 — Pages publiques
**EstablishmentResponse.tsx** (token loading déjà fait, reste le formulaire) :
- Afficher contexte session (formation, lieu, période, durée, mode, format)
- `AvailabilityPicker` : calendrier des jours de la période, cases à cocher matin/après-midi selon slot_mode
- Champ commentaire facultatif
- Récapitulatif avant envoi
- Soumettre → insérer dans `availabilities` + mettre à jour `participant_responses` + statut session

**TrainerResponse.tsx** (même base + en plus) :
- Préférence globale (idéal / possible / à confirmer)
- Affiner par créneau (écrase globale)
- Date limite de maintien (date picker)

### Phase 5 — Connecter le moteur
- Charger les dispos depuis Supabase
- Appeler `runMatching()` (déjà dans `lib/matching.ts`)
- Insérer les résultats dans `proposals`
- Mettre à jour `sessions.status` (match_found ou no_match)

### Phase 6 — Dashboard
- `SessionCard.tsx` avec : formation, établissement, intervenant, lieu, période, statut établissement, statut intervenant, statut global, nb propositions, action principale
- `DashboardStats.tsx` : compteurs en attente / réponses complètes / matchs trouvés / sans solution
- Filtres par statut
- Bouton relancer (établissement ou intervenant)

### Phase 7 — Détail session
- Tous les blocs : résumé + réponses + dispos + propositions
- `ProposalCard.tsx` avec score, CompatibilityBadge, dates, dominant_preference, earliest_keep_until
- Bouton Valider → status = confirmed, proposition = selected, autres = discarded

### Phase 8 — Notifications email
Service recommandé : **Resend** (SDK simple, Free tier 3000 emails/mois)
- Email établissement : lien `/r/establishment/:token`
- Email intervenant : lien `/r/trainer/:token`
- Notif AEC quand les deux ont répondu
- Notif confirmation finale

### Phases 9-10 — Nettoyage + tests métier
Voir `tasks/todo.md` pour les cases détaillées.

---

## Points d'attention techniques

1. **RLS** : les pages publiques lisent la session via token. La policy SQL autorise SELECT sur `sessions` si l'id est dans `access_tokens` actifs. Tester que les tokens expirés sont bien rejetés.

2. **Token generation** : dans `001_initial_schema.sql`, le token est généré par `encode(gen_random_bytes(32), 'hex')` côté Supabase. Quand on crée une session et qu'on envoie, il faut insérer dans `access_tokens` sans préciser le token — Supabase le génère.

3. **Matching** : `lib/matching.ts` est une **fonction pure** (aucun appel Supabase dedans). On charge les données en amont et on passe tout à `runMatching()`. C'est testable sans DB.

4. **`findCombinations`** dans matching.ts est limité à 20 candidats (`.slice(0, 20)`) pour éviter les explosions combinatoires sur les sessions discontinues longues. Ajuster si nécessaire.

5. **Vercel** : le `vercel.json` redirige tout vers `index.html` — obligatoire pour que les routes `/r/establishment/:token` fonctionnent directement en URL.
