@'

\# 01 - Cahier des charges



\## Objectif



Match Intra permet à AEC de coordonner simplement les disponibilités entre un établissement client et un intervenant externe afin de planifier une formation intra.



L'application vise à :

\- réduire les allers-retours par email ou téléphone ;

\- fluidifier le parcours client ;

\- raccourcir les délais de planification ;

\- centraliser les réponses ;

\- aider AEC à valider rapidement une proposition compatible.



\## Périmètre MVP



Inclus :

\- création d'une demande de coordination par AEC ;

\- choix du programme de formation ;

\- saisie du lieu ;

\- paramétrage de la durée ;

\- choix du mode continu ou discontinu ;

\- choix du format journée complète ou demi-journée ;

\- génération de liens pour l'établissement et l'intervenant ;

\- saisie des disponibilités ;

\- préférences intervenant ;

\- date limite de maintien de disponibilité ;

\- moteur de matching ;

\- affichage de 5 propositions maximum ;

\- validation finale par AEC.



Exclus du MVP :

\- facturation ;

\- gestion complète des formations ;

\- gestion des présences ;

\- conventions ;

\- multi-organismes ;

\- synchronisation agenda ;

\- application mobile native.



\## Utilisateurs



\### AEC

AEC est l'utilisateur administrateur. Il crée les demandes, suit les réponses, consulte les propositions et valide la session finale.



\### Établissement

L'établissement est le client. Il reçoit un lien, consulte les informations de la demande et renseigne ses disponibilités.



\### Intervenant

L'intervenant reçoit un lien, consulte la demande, renseigne ses disponibilités, indique ses préférences et précise jusqu'à quelle date il maintient ses créneaux.



\## Déclencheur



Une demande de coordination est créée lorsque la formation intra est suffisamment avancée pour lancer la recherche de dates, par exemple après validation du devis ou après un échange avec le coordonnateur de formation.



\## Fin de coordination



La coordination est terminée lorsque AEC valide une proposition et confirme la ou les dates retenues.



\## Données minimales d'une session



\- Formation

\- Établissement

\- Email établissement

\- Intervenant

\- Email intervenant

\- Lieu de formation

\- Période souhaitée

\- Durée : 1, 2 ou 3 jours

\- Mode : continu ou discontinu

\- Format : journée complète ou demi-journée

\- Commentaire établissement

\- Commentaire intervenant



\## Pages attendues



Pages AEC :

\- Login

\- Dashboard

\- Création session

\- Détail session



Pages publiques :

\- Réponse établissement

\- Réponse intervenant

\- Confirmation



\## Priorité UX



L'établissement et l'intervenant doivent comprendre immédiatement ce qu'ils doivent faire. Le parcours doit être mobile first, court et sans création de compte.

'@ | Set-Content 01-cahier-des-charges.md -Encoding UTF8

