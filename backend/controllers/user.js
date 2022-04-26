const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User

exports.signup = (req, res, next) => {
    console.log('req body before: \n',req.body)
    bcrypt.hash(req.body.pass, 10)
        .then(hash => {
            const user = {
                email: req.body.email,
                username: req.body.username,
                pass: hash,
                isAdmin: false
            }
            User.create(user)
                .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
                .catch(error => res.status(400).json({ message: 'Impossible de créer cet utilisateur', error }))
        })
        .catch(error => res.status(500).json({ error: "Erreur serveur" }))
}