'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

try {
  sequelize.authenticate()
    // .then( async () => {
    //     await sequelize.sync({ alter: true}) //force: true 
    //     console.log('[ mysql ] Sync successfully');
    //   })
    // .catch((error) => {
    //   console.error('[ mysql ] Unable to connect to the database:', error);
    // })
  console.log('[ mysql ] Connection has been established successfully.');
} catch (error) {
  console.error('[ mysql ] Unable to connect to the database:', error);
}



// //authenticate()fonction pour tester si la connexion est OK
// sequelize.authenticate()
// .then( async ()=> {
//     console.log('\u001b[' + 32 + 'm' + '|---------connexion réussie à la base de donnée----------|' + '\u001b[0m'); //log vert
//     //synchronisation des tables(model)
//     // alter:true verifie la table et apporte le modification si nessesaire
//     await sequelize.sync({alter: true, force: true})  //force:true (drop table)
//     console.log('\u001b[' + 32 + 'm' + '|------synchronisation réussie------|' + '\u001b[0m'); //log vert
// }) .catch((error) => {
//   console.log('\u001b[' + 31 + 'm' + `|------synchronisation échouée: info--->  ${error}` + '\u001b[0m');  //log rouge
//   // afficher l'erreur , fait crasher le serveur (pour ne pas laisser le serveur allumer pour rien)
//   throw error
// });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;