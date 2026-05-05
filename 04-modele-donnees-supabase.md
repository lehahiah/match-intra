@'

\# 04 - Modèle de données Supabase



\## Table programs



Stocke les programmes de formation.



Champs :

\- id uuid primary key

\- name text not null

\- catalog\_duration\_days integer

\- active boolean default true

\- created\_at timestamptz default now()



\## Table sessions



Une ligne = une demande de coordination.



Champs :

\- id uuid primary key

\- reference text unique

\- program\_id uuid references programs(id)

\- custom\_program\_name text

\- establishment\_name text not null

\- establishment\_email text not null

\- trainer\_name text not null

\- trainer\_email text not null

\- location\_label text not null

\- period\_start date not null

\- period\_end date not null

\- duration\_days integer not null

\- total\_units integer not null

\- scheduling\_mode text not null

\- slot\_mode text not null

\- establishment\_comment text

\- trainer\_comment text

\- status text not null default 'draft'

\- created\_by uuid

\- created\_at timestamptz default now()

\- updated\_at timestamptz default now()

\- sent\_at timestamptz

\- matched\_at timestamptz

\- confirmed\_at timestamptz



Valeurs scheduling\_mode :

\- continuous

\- discontinuous



Valeurs slot\_mode :

\- full\_day

\- half\_day



Valeurs status :

\- draft

\- sent

\- partial\_response

\- complete\_responses

\- match\_found

\- no\_match

\- confirmed

\- closed



\## Table access\_tokens



Gère les accès publics sans compte.



Champs :

\- id uuid primary key

\- session\_id uuid references sessions(id)

\- role text not null

\- token text unique not null

\- expires\_at timestamptz

\- first\_opened\_at timestamptz

\- submitted\_at timestamptz

\- active boolean default true

\- created\_at timestamptz default now()



Valeurs role :

\- establishment

\- trainer



Contrainte recommandée :

\- unique(session\_id, role)



\## Table participant\_responses



Stocke l'état global de la réponse par participant.



Champs :

\- id uuid primary key

\- session\_id uuid references sessions(id)

\- role text not null

\- global\_preference text

\- keep\_until date

\- comment text

\- response\_status text not null default 'not\_started'

\- responded\_at timestamptz

\- created\_at timestamptz default now()

\- updated\_at timestamptz default now()



Valeurs role :

\- establishment

\- trainer



Valeurs response\_status :

\- not\_started

\- in\_progress

\- submitted



Contrainte recommandée :

\- unique(session\_id, role)



\## Table availabilities



Stocke les disponibilités unitaires.



Champs :

\- id uuid primary key

\- session\_id uuid references sessions(id)

\- role text not null

\- availability\_date date not null

\- slot text not null

\- is\_available boolean default true

\- preference\_level text

\- keep\_until date

\- created\_at timestamptz default now()

\- updated\_at timestamptz default now()



Valeurs slot :

\- morning

\- afternoon



Valeurs preference\_level :

\- ideal

\- possible

\- confirm\_later



\## Table proposals



Stocke les propositions générées par le moteur.



Champs :

\- id uuid primary key

\- session\_id uuid references sessions(id)

\- proposal\_type text not null

\- proposal\_rank integer not null

\- score integer not null

\- compatibility\_level text not null

\- dates\_json jsonb not null

\- units\_count integer not null

\- earliest\_keep\_until date

\- dominant\_preference text

\- status text not null default 'proposed'

\- created\_at timestamptz default now()



Valeurs compatibility\_level :

\- strong

\- medium

\- fragile



Valeurs status :

\- proposed

\- selected

\- discarded



\## Table notifications - optionnelle V1.1



Champs :

\- id uuid primary key

\- session\_id uuid references sessions(id)

\- type text not null

\- recipient\_role text

\- recipient\_email text

\- status text

\- sent\_at timestamptz

\- payload\_json jsonb

\- created\_at timestamptz default now()

'@ | Set-Content 04-modele-donnees-supabase.md -Encoding UTF8

