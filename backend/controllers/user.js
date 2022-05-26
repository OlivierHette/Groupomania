const bcrypt    = require('bcrypt')
const jwt       = require('jsonwebtoken')
const User      = require('../models').User
const Op        = require('sequelize').Op

/** 
 * Endpoint pour l'inscription
 */
exports.signup = (req, res, next) => {
    let regex       = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    let email       = req.body.email
    let username    = req.body.username
    let pass        = req.body.pass
    let isAdmin     = req.body.isAdmin

    if(email == null || username == null || pass == null) {
        return res.status(401).json({ error: 'Champs vide' })
    }
    if(regex.test(pass)){ 
        bcrypt.hash(pass, 10)
            .then(hash => {
                const user = {
                    email: email,
                    username: username,
                    pass: hash,
                    isAdmin: isAdmin
                }
                User.create(user)
                    .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
                    .catch(error => res.status(400).json({ message: 'Impossible de créer cet utilisateur', error }))
            })
            .catch(error => res.status(500).json({ error: "Erreur serveur" }))
    } else {
        return res.status(401).json({ error: 'Le mot de passe doit avoir au moins 8 caractères, un nombre, une minuscule, et une majuscule' })
    }
}
/** 
 * Endpoint pour la connexion
 */
exports.login = (req, res, next) => {
    User.findOne({ where: { username: req.body.username }})
        .then(user => {
            if(!user) return res.status(404).json({ error: 'Utilisateur non trouvé !' })

            bcrypt.compare(req.body.pass, user.pass)
                .then(valid => {
                    if(!valid) return res.status(401).json({ error: 'Mot de passe incorrect !' })

                    console.log('user.js > isAdmin --> ', user.isAdmin);

                    res.status(200).json({
                        id:         user.id,
                        isAdmin:    user.isAdmin,
                        token: jwt.sign(
                            { userId: user.id, isAdmin: user.isAdmin },
                            'RANDOM_TOKEN',
                            { expiresIn: '72h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error: 'bcrypt compare: '}))            
        })
        .catch(error => res.status(500).json({ error: 'Serveur error findOne'}))
}

exports.getUser = (req, res, next) => {
    const userId = req.params.id

    User.findByPk(userId).then(user => {
        if (user) {
            res.status(200).json({
                id:         user.id,
                email:      user.email,
                username:   user.username,
                isAdmin:    user.isAdmin
            })
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    }).catch(error => res.status(500).json({ error }))
}

exports.modifyUser = (req, res, next) => {
    const userId = req.params.id

    const updateUser = {
        username: req.body.username
    }

    User.update(updateUser, { where: { id: userId }})
        .then(() => res.status(200).json({ message: 'Utilisateur modifié avec succès.'}))
        .catch(error => res.status(400).json({ error: 'Impossible de modifier cet utilisateur !'}))
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id

    User.destroy({ where: { id: userId }})
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé avec succès.'}))
        .catch(error => res.status(400).json({ error: 'Impossible de supprimer cet utilisateur !'}))
}

exports.getAllUsersByAdmin = (req, res, next) => {
    const userId = req.params.id

    User.findAll({
        where: {
            id: {
                [Op.not]: userId
            }
        }
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher les utilisateurs', error }))
}

exports.modifyUserRole = (req, res, next) => {
    const id = req.params.id

    let updatedRole = {
        isAdmin: req.body.isAdmin
    }

    User.update(updatedRole, { where: { id: id }})
        .then(() => res.status(200).json({ message: 'Rôle de l\'utilisateur modifié avec succès' }))
        .catch(error => res.status(400).json({ error: 'Impossible de modifier le rôle de cet utilisateur', error }))
}