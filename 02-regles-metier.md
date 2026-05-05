@'

\# 02 - Règles métier



\## Principe général



L'application sert uniquement à coordonner les disponibilités entre un établissement et un intervenant pour une formation intra.



AEC conserve toujours la décision finale.



\## Durée



La durée est paramétrée par session.



Valeurs autorisées :

\- 1 jour

\- 2 jours

\- 3 jours



Règle interne :

\- 1 jour = 2 unités

\- 2 jours = 4 unités

\- 3 jours = 6 unités



Une unité correspond à une demi-journée :

\- morning

\- afternoon



\## Format



AEC choisit un seul format par session :

\- full\_day

\- half\_day



\### full\_day

La formation est planifiée en journées complètes. Une journée complète nécessite :

\- morning

\- afternoon



\### half\_day

La formation est planifiée par demi-journées. Ce cas permet notamment d'étaler une formation pour des publics fatigables.



\## Mode de planification



AEC choisit un seul mode par session :

\- continuous

\- discontinuous



\### continuous

Les jours ou demi-journées doivent s'enchaîner de manière continue.



\### discontinuous

Les jours ou demi-journées peuvent être espacés.



\## Disponibilités



Une disponibilité est stockée par unité :

\- date

\- slot : morning ou afternoon

\- rôle : establishment ou trainer



Une journée complète cochée par l'utilisateur est enregistrée comme deux lignes :

\- morning

\- afternoon



\## Préférence intervenant



L'intervenant peut indiquer :

\- une préférence globale ;

\- une préférence spécifique par date ou créneau.



Valeurs :

\- ideal

\- possible

\- confirm\_later



Règle :

\- la préférence spécifique écrase la préférence globale ;

\- si aucune préférence spécifique n'existe, la préférence globale est utilisée.



\## Date limite de maintien



L'intervenant indique une date jusqu'à laquelle il maintient ses disponibilités.



Un créneau dont la date de maintien est dépassée ne doit plus être utilisé dans les nouvelles propositions.



\## Matching



Un créneau compatible existe si :

\- même session ;

\- même date ;

\- même slot ;

\- disponible côté établissement ;

\- disponible côté intervenant.



\## Propositions



Le moteur génère au maximum 5 propositions.



Les propositions sont classées par score décroissant.



AEC peut :

\- valider une proposition ;

\- proposer une alternative ;

\- relancer l'établissement ou l'intervenant.



\## Statuts session



\- draft : brouillon

\- sent : demande envoyée

\- partial\_response : une seule réponse reçue

\- complete\_responses : les deux réponses sont reçues

\- match\_found : au moins une proposition compatible existe

\- no\_match : aucune proposition compatible

\- confirmed : proposition validée par AEC

\- closed : session clôturée ou archivée

'@ | Set-Content 02-regles-metier.md -Encoding UTF8

