@'

\# 03 - Parcours utilisateurs



\## Principe général



Match Intra repose sur 3 parcours distincts :



\- AEC : pilote la coordination.

\- Établissement : renseigne ses disponibilités.

\- Intervenant : renseigne ses disponibilités, ses préférences et sa date limite de maintien.



L'objectif UX est de laisser la complexité côté AEC et de rendre les parcours externes très simples.



\## Parcours AEC



\### 1. Connexion



AEC se connecte à l'application.



Objectif :

\- accéder au tableau de bord sécurisé.



\### 2. Tableau de bord



AEC voit toutes les demandes de coordination.



Informations visibles :

\- formation

\- établissement

\- intervenant

\- lieu

\- période

\- statut établissement

\- statut intervenant

\- statut global

\- nombre de propositions compatibles



Filtres :

\- toutes

\- en attente

\- réponses complètes

\- matchs trouvés

\- sans solution

\- validées



Actions :

\- créer une nouvelle session

\- ouvrir le détail d'une session

\- relancer établissement

\- relancer intervenant

\- valider une proposition si disponible



\### 3. Création d'une session



AEC renseigne :

\- formation

\- autre formation si besoin

\- établissement

\- email établissement

\- intervenant

\- email intervenant

\- lieu de formation

\- période souhaitée

\- durée : 1, 2 ou 3 jours

\- mode : continu ou discontinu

\- format : journée complète ou demi-journée

\- commentaire à destination de l'établissement

\- commentaire à destination de l'intervenant



Actions :

\- enregistrer en brouillon

\- envoyer la demande



Après envoi :

\- un lien est généré pour l'établissement

\- un lien est généré pour l'intervenant

\- la session passe au statut sent



\### 4. Détail d'une session



AEC consulte :

\- contexte de la session

\- réponse de l'établissement

\- réponse de l'intervenant

\- disponibilités saisies

\- propositions compatibles

\- score et niveau de compatibilité



Actions :

\- relancer si une réponse manque

\- modifier la session si nécessaire

\- valider une proposition

\- proposer une alternative manuelle

\- clôturer ou archiver plus tard



\### 5. Validation finale



AEC sélectionne une proposition.



L'application affiche un récapitulatif :

\- formation

\- établissement

\- intervenant

\- lieu

\- date ou dates retenues

\- format

\- mode



AEC confirme.



Effets :

\- la proposition passe en selected

\- la session passe en confirmed

\- les autres propositions passent en discarded

\- une notification de confirmation peut être envoyée.



\## Parcours Établissement



\### 1. Ouverture du lien



L'établissement reçoit un lien unique.



Aucun compte n'est demandé.



La page affiche :

\- nom AEC

\- formation

\- lieu

\- période

\- durée

\- mode de planification

\- format

\- commentaire AEC si présent



Action :

\- commencer



\### 2. Saisie des disponibilités



L'établissement choisit ses disponibilités dans la période proposée.



Affichage :

\- calendrier synthétique

\- liste de dates avec cases



Si format = journée complète :

\- une case par date



Si format = demi-journée :

\- une case matin

\- une case après-midi



\### 3. Commentaire



L'établissement peut ajouter un commentaire facultatif.



Exemples :

\- contrainte interne

\- préférence d'horaire

\- précision sur le lieu

\- contrainte d'organisation



\### 4. Récapitulatif



Avant envoi, l'établissement voit :

\- les dates sélectionnées

\- les demi-journées sélectionnées si applicable

\- son commentaire



Action :

\- envoyer mes disponibilités



\### 5. Confirmation



Message :

\- "Vos disponibilités ont bien été transmises à AEC."



Effets :

\- participant\_response establishment passe à submitted

\- access\_token establishment reçoit submitted\_at

\- la session change de statut selon l'état de la réponse intervenant

\- si les deux réponses sont reçues, le matching peut être lancé



\## Parcours Intervenant



\### 1. Ouverture du lien



L'intervenant reçoit un lien unique.



Aucun compte n'est demandé.



La page affiche :

\- nom AEC

\- formation

\- lieu

\- période

\- durée

\- mode de planification

\- format

\- commentaire AEC si présent



Action :

\- commencer



\### 2. Saisie des disponibilités



Même logique que l'établissement.



Si format = journée complète :

\- une case par date



Si format = demi-journée :

\- une case matin

\- une case après-midi



\### 3. Préférence globale



L'intervenant choisit une préférence globale :

\- idéal

\- possible

\- à confirmer



Cette préférence s'applique à toutes les disponibilités, sauf si l'intervenant affine certaines dates.



\### 4. Préférence par date ou créneau



L'intervenant peut affiner certaines disponibilités.



Pour chaque date ou créneau sélectionné, il peut choisir :

\- idéal

\- possible

\- à confirmer



Règle :

\- la préférence spécifique écrase la préférence globale.



\### 5. Date limite de maintien



L'intervenant indique jusqu'à quelle date il maintient ses disponibilités.



Cette information sert à prioriser les propositions et à éviter de conserver des créneaux obsolètes.



\### 6. Commentaire



L'intervenant peut ajouter un commentaire facultatif.



Exemples :

\- contrainte de déplacement

\- précision horaire

\- condition liée au lieu

\- réserve sur certaines dates



\### 7. Récapitulatif



Avant envoi, l'intervenant voit :

\- les disponibilités sélectionnées

\- la préférence globale

\- les préférences spécifiques éventuelles

\- la date limite de maintien

\- le commentaire



Action :

\- envoyer mes disponibilités



\### 8. Confirmation



Message :

\- "Vos disponibilités ont bien été transmises à AEC."



Effets :

\- participant\_response trainer passe à submitted

\- access\_token trainer reçoit submitted\_at

\- la session change de statut selon l'état de la réponse établissement

\- si les deux réponses sont reçues, le matching peut être lancé



\## Parcours sans match



Si les deux réponses sont reçues mais qu'aucune proposition compatible n'existe :



Statut :

\- no\_match



AEC doit pouvoir :

\- relancer l'établissement

\- relancer l'intervenant

\- modifier la période

\- modifier le format

\- proposer une alternative manuelle



L'interface ne doit jamais laisser AEC sans action possible.



\## Parcours avec match



Si au moins une proposition compatible existe :



Statut :

\- match\_found



AEC voit :

\- jusqu'à 5 propositions

\- score

\- compatibilité forte / moyenne / à sécuriser

\- date limite de maintien la plus proche

\- préférence dominante



AEC valide une proposition.



\## Cas d'erreur



\### Token invalide



Afficher :

\- "Ce lien n'est pas valide ou a expiré."



\### Session déjà confirmée



Afficher :

\- "Cette session a déjà été confirmée. Vous pouvez contacter AEC si nécessaire."



\### Aucune disponibilité sélectionnée



Empêcher l'envoi et afficher :

\- "Veuillez sélectionner au moins un créneau."



\### Date hors période



Ne pas permettre la sélection.



\## Principes UX



\- mobile first

\- aucune création de compte pour les externes

\- une action principale par écran

\- textes courts

\- récapitulatif avant envoi

\- confirmation claire

\- statuts visibles côté AEC

\- complexité cachée côté établissement et intervenant

'@ | Set-Content 03-parcours-utilisateurs.md -Encoding UTF8

