# Match Intra

Application web de coordination des formations intra pour AEC.

**Objectif** : permettre à AEC de recueillir les disponibilités d'un établissement client et d'un intervenant externe, puis de faire ressortir automatiquement les propositions compatibles.

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Realtime)
- Vercel (déploiement)

## Utilisateurs

- **AEC** : crée les demandes, suit les réponses, valide la proposition finale. Seul utilisateur authentifié.
- **Établissement** : renseigne ses disponibilités via un lien sécurisé. Aucun compte requis.
- **Intervenant** : renseigne ses disponibilités, ses préférences et une date limite de maintien via un lien sécurisé. Aucun compte requis.

## Démarrage local

```bash
npm install
cp .env.local.example .env.local
# Remplir les variables Supabase dans .env.local
npm run dev
```

## Déploiement

Push sur `main` → déploiement automatique sur Vercel.

## Docs

- `01-cahier-des-charges.md`
- `02-regles-metier.md`
- `03-parcours-utilisateurs.md`
- `04-modele-donnees-supabase.md`
- `05-moteur-matching.md`
- `06-architecture-front-react.md`
- `08-roadmap-developpement.md`
