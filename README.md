# Groupomania
<img src="https://github.com/OlivierHette/Groupomania/blob/main/frontend/src/assets/images/logo-red.png?raw=true"/>
Groupomania est un réseau social d'entreprise visant à permettre les membres d'une équipe a partager du contenu et communiquer entre eux

## Dépendances

### BackEnd
Le BackEnd est développé en JavaScript à l'aide de <a href="https://nodejs.dev/download">Node.js<a/> v17.3.0
#### Liste des dépendances du BackEnd :
  - express
  - nodemon
  - mysql2
  - sequelize
  - sequelize-cli
  - cors
  - bcrypt
  - jsonwebtoken
  - multer

## Installation
  - Télécharger <a href="https://nodejs.dev/download">Node.js<a/> current version :
  - Depuis votre terminal rendez-vous dans le dossier backend > `cd backend` et executer `npm install`
   
  ### Configuration de la base de données :
  - Étant donné que les migrations sont déjà faites et les models aussi, vous devez allez dans le dossier `config` et configurer votre `config.json` pour vous connectez à votre base de données.
  J'utilise <a href="https://www.wampserver.com/">WampServer</a> pour la connexion a ma base de donnée et le panel `PhpMyAdmin` fournit avec.
  - Si comme moi vous utilisez `Wamp` rendez vous dans `PhpMyAdmin`, sinon utilisé votre gestionnaire de base de donnée favori. Créer votre bases de donnée et appelé la comme vous le souhaitez.
  Dans le projet j'ai utilisé `db_development_groupomania`. Retournons dans notre ficher config.json
  ```JSON
  {
    "development": {
      "username": "root", // identifian
      "password": null, // mots de passe
      "database": "db_development_groupomania", // Nom de votre base de donné
      "host": "127.0.0.1", // Adresse de connexion
      "dialect": "mysql", 
      "define" : { 
        "charset" : "utf8", 
        "collate" : "utf8_general_ci",
        "engine": "InnoDB"
      }
    }
  }
  ```
  - Retournez dans votre terminal dans votre `backend` et executer la commande suivante > `sequelize db:migrate`
  - Vous devriez voir les tables `user`, `post` et `comments`créée
  - Lancez le serveur > `nodemon server`
  - Execution de l'API sur http://localhost:3001 si le port est déjà utilisé rendez-vous dans `server.js` à la racine de votre dossier `backend` et modifier cette ligne par un port non utilisé:
  ```javascript
  const port = normalizePort(process.env.PORT || '3001')
  ```
  
### FrontEnd
Le FrontEnd est développé en JavaScript et HTML/CSS avec <a href="https://tailwindcss.com/docs/installation">TailwindCss</a>, <a href="https://fr.reactjs.org/">React</a> et <a href="https://fr.reactjs.org/docs/create-a-new-react-app.html#create-react-app">CreateReactApp</a> 
#### Liste des dépendances du FrontEnd :
  - react
  - react-dom
  - react-router-dom
  - react-scripts
  - web-vitals
  - autoprefixer
  - postcss
  - tailwindcss
  
  ## Installation
  - Ouvrez un nouveau terminal et rendez-vous dans le dossier `frontend` > `cd frontend`
        - Installez le `frontend` > `npm install`
        - Lancez le serveur > `npm start`
        - Le serveur ce lance sur le port 3000 pour changer le port rendez-vous dans le package.json :
          
  ```JSON
           "scripts": {
            "start": "react-scripts start", /* Modifier cette ligne pour changer le port :
            * Linux et MacOs: 
            *   "start": "PORT=3006 react-scripts start" ou "start": "export PORT=3006 react-scripts start"
            * Windows : 
            *   "start": "set PORT=3006 && react-scripts start"
            */
            "build": "react-scripts build",
            "test": "react-scripts test",
            "eject": "react-scripts eject"
          },
          ```     
