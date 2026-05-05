@'

\# 06 - Architecture front React



\## Stack



\- React

\- Vite

\- TypeScript

\- Tailwind CSS

\- Supabase



\## Routes



Routes AEC :

\- /login

\- /dashboard

\- /sessions/new

\- /sessions/:id



Routes publiques :

\- /r/establishment/:token

\- /r/trainer/:token

\- /thanks



\## Structure recommandée



src/

&#x20; components/

&#x20;   dashboard/

&#x20;     DashboardStats.tsx

&#x20;     SessionCard.tsx

&#x20;     StatusBadge.tsx

&#x20;   sessions/

&#x20;     SessionForm.tsx

&#x20;     SessionDetailHeader.tsx

&#x20;     ParticipantResponseCard.tsx

&#x20;   availability/

&#x20;     AvailabilityPicker.tsx

&#x20;     AvailabilitySummary.tsx

&#x20;     DateSlotSelector.tsx

&#x20;   proposals/

&#x20;     ProposalList.tsx

&#x20;     ProposalCard.tsx

&#x20;   public/

&#x20;     PublicSessionHeader.tsx

&#x20;     PublicResponseLayout.tsx

&#x20;   ui/

&#x20;     Button.tsx

&#x20;     Card.tsx

&#x20;     Input.tsx

&#x20;     Textarea.tsx

&#x20;     Select.tsx

&#x20; lib/

&#x20;   supabase.ts

&#x20;   matching.ts

&#x20;   dates.ts

&#x20;   status.ts

&#x20; pages/

&#x20;   Login.tsx

&#x20;   Dashboard.tsx

&#x20;   SessionNew.tsx

&#x20;   SessionDetail.tsx

&#x20;   EstablishmentResponse.tsx

&#x20;   TrainerResponse.tsx

&#x20;   Thanks.tsx

&#x20; types/

&#x20;   database.ts

&#x20;   session.ts

&#x20;   availability.ts

&#x20;   proposal.ts



\## Pages



\### Login



But :

\- permettre à AEC de se connecter.



Contenu :

\- email

\- mot de passe

\- bouton connexion



\### Dashboard



But :

\- suivre toutes les coordinations.



Contenu :

\- indicateurs

\- filtres

\- liste des sessions

\- bouton Nouvelle session



Indicateurs :

\- En attente

\- Réponses complètes

\- Matchs trouvés

\- Sans solution



Carte session :

\- formation

\- établissement

\- intervenant

\- lieu

\- période

\- statut établissement

\- statut intervenant

\- statut global

\- nombre de propositions

\- action principale



\### SessionNew



But :

\- créer une session ou un brouillon.



Champs :

\- formation

\- autre formation

\- établissement

\- email établissement

\- intervenant

\- email intervenant

\- lieu

\- période début

\- période fin

\- durée

\- mode

\- format

\- commentaire établissement

\- commentaire intervenant



Actions :

\- enregistrer brouillon

\- envoyer la demande



\### SessionDetail



But :

\- consulter l'état complet d'une coordination.



Blocs :

\- résumé session

\- réponse établissement

\- réponse intervenant

\- disponibilités

\- propositions

\- actions



Actions :

\- relancer établissement

\- relancer intervenant

\- valider une proposition

\- modifier session



\### EstablishmentResponse



But :

\- permettre à l'établissement de répondre via token.



Sections :

\- contexte session

\- disponibilité

\- commentaire

\- récapitulatif

\- envoi



\### TrainerResponse



But :

\- permettre à l'intervenant de répondre via token.



Sections :

\- contexte session

\- disponibilité

\- préférence globale

\- affiner par date

\- date limite de maintien

\- commentaire

\- récapitulatif

\- envoi



\## Design



Priorités :

\- mobile first

\- interface claire

\- peu de texte

\- gros boutons

\- cartes lisibles

\- statuts visibles



Palette :

\- neutre clair

\- une couleur principale

\- couleur alerte sobre

\- couleur succès sobre



\## Principes techniques



\- Les pages publiques chargent la session via token.

\- Les utilisateurs externes n'ont pas de compte.

\- AEC est le seul utilisateur authentifié.

\- Le matching doit être dans lib/matching.ts ou dans une fonction backend.

\- Les types doivent être stricts.

\- Les statuts doivent être centralisés dans lib/status.ts.

'@ | Set-Content 06-architecture-front-react.md -Encoding UTF8

