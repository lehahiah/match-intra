@'

\# 08 - Roadmap développement



\## Phase 0 - Préparation



\- créer le repo

\- installer React + Vite + TypeScript

\- installer Tailwind

\- créer les fichiers de référence

\- créer le projet Supabase



\## Phase 1 - Base Supabase



\- créer les tables

\- créer les enums ou contraintes de valeurs

\- créer les relations

\- créer les index utiles

\- créer les policies RLS minimales



Priorité :

\- sessions

\- programs

\- access\_tokens

\- participant\_responses

\- availabilities

\- proposals



\## Phase 2 - Front skeleton



Créer les routes :

\- /login

\- /dashboard

\- /sessions/new

\- /sessions/:id

\- /r/establishment/:token

\- /r/trainer/:token

\- /thanks



Créer les composants UI de base :

\- Button

\- Card

\- Input

\- Select

\- Textarea

\- StatusBadge



\## Phase 3 - Création session



\- formulaire AEC

\- sauvegarde brouillon

\- envoi session

\- génération des tokens établissement et intervenant

\- changement statut draft -> sent



\## Phase 4 - Pages publiques



\- charger session par token

\- afficher contexte

\- sélectionner disponibilités

\- enregistrer availabilities

\- enregistrer participant\_response

\- passer response\_status à submitted



\## Phase 5 - Moteur de matching



\- construire la fonction de matching

\- tester les cas :

&#x20; - full\_day continuous

&#x20; - full\_day discontinuous

&#x20; - half\_day continuous

&#x20; - half\_day discontinuous

\- générer proposals

\- mettre à jour status session



\## Phase 6 - Dashboard



\- afficher sessions

\- ajouter les filtres

\- afficher les compteurs

\- afficher les statuts

\- ouvrir détail session



\## Phase 7 - Détail session



\- afficher réponses

\- afficher disponibilités

\- afficher propositions

\- valider une proposition

\- passer session en confirmed



\## Phase 8 - Notifications



Version simple :

\- préparer textes emails

\- envoyer lien établissement

\- envoyer lien intervenant

\- notifier AEC quand les deux ont répondu

\- notifier établissement et intervenant après confirmation



\## Phase 9 - Nettoyage



\- vérifier responsive mobile

\- vérifier messages d'erreur

\- vérifier champs obligatoires

\- sécuriser tokens

\- ajouter états vides

\- ajouter page d'erreur token invalide



\## Phase 10 - Tests métier



Tester :

\- 1 jour journée complète continu

\- 2 jours journée complète continu

\- 3 jours journée complète discontinu

\- 1 jour en demi-journées discontinu

\- aucun match

\- keep\_until expiré

\- préférence idéale

\- préférence à confirmer

'@ | Set-Content 08-roadmap-developpement.md -Encoding UTF8

