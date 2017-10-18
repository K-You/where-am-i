
Il s'agit de développer un service minimal de partage de position, basé sur Firebase.

- Parcourir un peu la doc de Firebase, elle est très bonne.
- Créer un projet Firebase dans la console Google
- Développer un serveur Node.js avec deux routes :
	1. Une API REST qui prend quatre arguments (latitude, longitude, session_id, couleur) et les enregistre dans Firebase Realtime Database
	2. Une route qui sert une page html moche, qui affiche les positions en temps
     réel sur une carte Google maps pour un session_id donné dans l'URL, en lisant directement dans Firebase.
     L'affichage d'un point se fait avec un marqueur de couleur bleu, rouge, ou vert.

- Bonus :
     Créer un ou plusieurs Dockerfile pour le déploiement de ce serveur.
     Donner la commande pour construire les conteneurs, pour démarrer un conteneur
     pour la production (sources empaquetés dans l'image du conteneur), ou pour 
     développer (édition des sources sans redémarrage du conteneur).

Soumettre le résultat sous forme de repository git/github/bitbucket.
On peut éventuellement inclure un fichier README.md donnant des explications.

