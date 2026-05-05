@'

\# 05 - Moteur de matching



\## Objectif



Le moteur de matching compare les disponibilités de l'établissement et de l'intervenant afin de générer jusqu'à 5 propositions compatibles pour AEC.



\## Données d'entrée



Depuis sessions :

\- duration\_days

\- total\_units

\- scheduling\_mode

\- slot\_mode

\- period\_start

\- period\_end



Depuis participant\_responses :

\- réponse établissement submitted

\- réponse intervenant submitted

\- global\_preference intervenant

\- keep\_until intervenant



Depuis availabilities :

\- disponibilités établissement

\- disponibilités intervenant

\- préférence par date ou créneau

\- keep\_until spécifique si présent



\## Déclenchement



Le matching peut être lancé lorsque :

\- l'établissement a soumis sa réponse ;

\- l'intervenant a soumis sa réponse.



Il ne produit des propositions que si les deux réponses sont submitted.



\## Étape 1 - Normalisation



Ne garder que :

\- is\_available = true

\- date dans la période de session

\- access token actif si nécessaire



\## Étape 2 - Résolution des préférences



Pour chaque disponibilité intervenant :

\- utiliser preference\_level si présent ;

\- sinon utiliser global\_preference.



Pour keep\_until :

\- utiliser keep\_until de la disponibilité si présent ;

\- sinon utiliser keep\_until global.



Si keep\_until est dépassé, exclure le créneau.



\## Étape 3 - Intersection



Créer une liste des unités compatibles :

\- même date

\- même slot

\- disponibilité établissement

\- disponibilité intervenant



Chaque unité compatible contient :

\- date

\- slot

\- preference\_level résolu

\- keep\_until résolu



\## Étape 4 - Regroupement selon slot\_mode



\### full\_day



Une date est compatible si elle contient :

\- morning

\- afternoon



Le moteur travaille alors avec des blocs journée.



\### half\_day



Le moteur travaille avec les unités séparées :

\- morning

\- afternoon



\## Étape 5 - Génération selon scheduling\_mode



\### full\_day + continuous



Chercher des séquences de N journées complètes consécutives.



N = duration\_days



\### full\_day + discontinuous



Chercher des combinaisons de N journées complètes, non forcément consécutives.



Priorité :

\- dates proches dans le temps

\- meilleures préférences

\- keep\_until le plus stable



\### half\_day + continuous



Chercher des séquences de total\_units demi-journées sur des dates qui se suivent sans rupture.



\### half\_day + discontinuous



Chercher des combinaisons de total\_units demi-journées, non forcément consécutives.



Priorité :

\- cohérence chronologique

\- préférences

\- stabilité keep\_until



\## Score



Base :

\- proposition valide = 50 points



Préférence dominante :

\- ideal = +25

\- possible = +15

\- confirm\_later = +5



Stabilité :

\- toutes les dates maintenues à plus de 14 jours = +10

\- au moins une date entre 7 et 14 jours = +5

\- au moins une date à moins de 7 jours = +0



Cohérence chronologique :

\- proposition resserrée = +10

\- proposition moyenne = +5

\- proposition dispersée = +0



Simplicité :

\- full\_day continuous = +10

\- full\_day discontinuous = +5

\- half\_day continuous = +5

\- half\_day discontinuous = +0



Score plafonné à 100.



\## Compatibilité affichée



\- 80 à 100 : strong

\- 60 à 79 : medium

\- moins de 60 : fragile



Libellés interface :

\- strong : compatibilité forte

\- medium : compatibilité moyenne

\- fragile : à sécuriser



\## Résultat



Créer jusqu'à 5 lignes dans proposals.



Chaque proposition contient :

\- proposal\_type

\- proposal\_rank

\- score

\- compatibility\_level

\- dates\_json

\- units\_count

\- earliest\_keep\_until

\- dominant\_preference

\- status = proposed



\## Statut session après calcul



Si propositions trouvées :

\- sessions.status = match\_found

\- sessions.matched\_at = now()



Sinon :

\- sessions.status = no\_match

\- sessions.matched\_at = now()



\## Règle de recalcul



À chaque recalcul :

\- supprimer les proposals status proposed ;

\- conserver selected si la session n'est pas modifiable ;

\- ne pas recalculer automatiquement une session confirmed.

'@ | Set-Content 05-moteur-matching.md -Encoding UTF8

