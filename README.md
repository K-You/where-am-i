#Where Am I ? 

Oneshot 18/10/17

##Node - Firebase - MapsAPI 

-> npm run start

*To run this project, a private key is needed : `config/serviceAccountKey.json`*

##Docker : 
*Here you also will need to add `config/serviceAccountKey.json`*

`docker build -t <your-id>/where-am-i`
> image-id

`docker run -p 3000:3000 -d <image-id>`

##Endpoints : 

`GET /?session\_id={session\_id} ` --> Map displaying the last known location of the user identified by {session\_id}

`GET /locations/{session\_id} ` --> Returns the locations informations of the user identified by {session\_id}


`POST /locations/{session\_id} ` --> Adds a new location for the user identified by {session\_id}

Example : 

With a browser : connect on `http://localhost:3000?session_id=1` 

On a terminal, run the following curl command: 

`curl -H "Content-Type: application/json" -d '{"lat":48.866667,"lng":2.333333, "color":"blue"}' http://localhost:3000/locations/1 `

*Note that as this example calls the firebase data, the marker may already be located on this spot for the `session_id=1`.*

##Architecture : 

server.js -> app root

api/routes/locationsRoutes.js -> defines locations/:session\_id routes (GET & POST)

api/controllers/locationsController.js -> Contains the post & get logic

index.html -> Html file displaying the map & containing the logic to directly get firebase informations (the logic here is a sin of the oneshot process)



>	Martin D.A. : 
>
>	Il s'agit de développer un service minimal de partage de position, basé sur Firebase.
>
>	- Parcourir un peu la doc de Firebase, elle est très bonne.
>	- Créer un projet Firebase dans la console Google
>	- Développer un serveur Node.js avec deux routes :
>		1. Une API REST qui prend quatre arguments (latitude, longitude, session_id, couleur) et les enregistre dans Firebase Realtime Database
>		2. Une route qui sert une page html moche, qui affiche les positions en temps
>	     réel sur une carte Google maps pour un session_id donné dans l'URL, en lisant directement dans Firebase.
>	     L'affichage d'un point se fait avec un marqueur de couleur bleu, rouge, ou vert.
>
>	- Bonus :
>	     Créer un ou plusieurs Dockerfile pour le déploiement de ce serveur.
>	     Donner la commande pour construire les conteneurs, pour démarrer un conteneur
>	     pour la production (sources empaquetés dans l'image du conteneur), ou pour 
>	     développer (édition des sources sans redémarrage du conteneur).
>
>	Soumettre le résultat sous forme de repository git/github/bitbucket.
>	On peut éventuellement inclure un fichier README.md donnant des explications.

