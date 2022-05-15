# The Movie Project BACK & FRONT

Notre projet a été développé avec NodeJS pour le serveur et avec React pour le front. Sur le serveur se trouve tous les appels API de movieDB ainsi qu'à une base de données locale MongoDB (installée au préalable). 

## Lancement du projet 

- Cloner les deux repositories [BACK](https://github.com/cheleo07/theMovieProjectBack) et [FRONT](https://github.com/cheleo07/theMovieProjectFront) de notre projet
- Pour avoir toutes les dépendances nécessaires à notre framework, on utilise l'utilitaire npm avec la commande 
> npm install

### Pour lancer le serveur
On utilise la commande ci-dessous, en ayant bien vérifier que nous étions dans le bon dossier. Le port d'écoute est 3005.
> node main.js

### Pour lancer le framework
On utilise la commande ci dessous. Le port d'écoute est 3000. 
> npm start.


## Fonctionnalités développées pour le projet 

1. La possibilité de liker un film. Le nombre de likes est affiché et enregistré en base. Ainsi, nous pouvons voir combien de personnes ont aimé un film.
2. La possibilité de commenter un film en donnant son avis (pseudo, commentaire, note).

### Les appels API

Ces deux fonctionnalités nous ont permises de faire plusieurs appels API : 

> GET '/api/discover/movie/:page'


Cet appel nous a permis de récupérer toutes les informations sur les films et de les afficher sur notre page.

> PUT '/api/like/:idMovie'


Cet appel nous a permis d'utiliser l'API theMovieDB ainsi que la base de données locale. Cela récupère l'id du film. On vérifie si une insertion dans la base ne contient pas cet id. Si oui, on récupère son compteur de likes.

> POST '/api/comment/:idMovie'


Cet appel nous permet d'insérer localement les informations liées au commentaire d'un des utilisateurs. Ici, on a la possibilité de commenter sous un pseudo. On utilise l'API pour récupérer le genre du film ainsi que les informations récupérées dans la fenêtre modale pour les insérer en local.

> GET '/api/comment/get/:idMovie'


Cet appel nous permet de récupérer tous les commentaires laissés sur un film, à partir de son id.


## Phases d'amélioration

Nous avons réussi à effectuer toutes les requêtes côté serveur mais nous n'avons pas pu aboutir côté front, sur l'affichage des commentaires d'un film. Nous pourrions par la suite, faire une redirection via le bouton "Voir les commentaires" vers une page de commentaires pour chaque film, avec l'utilisation d'un Router.

## Membres de l'équipe
Rodica Adigbonon

Léo Chevalier

Laëtitia Phimmasane
