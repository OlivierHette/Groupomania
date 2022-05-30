const comment   = require('../models/comment');

const Comment   = require('../models').Comment
const User      = require('../models').User

exports.createComment = (req, res, next) => {
    const comment = {
        userId:     req.body.userId,
        postId:     req.body.postId,
        content:    req.body.content
    }

    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de créer ce commentaire', error }))
}

exports.getAllComments = (req, res, next) => {
    const postId = req.params.postId

    Comment.findAll({ 
        order: [['createdAt', 'DESC']], 
        where: { postId: postId }, 
        include: { model: User } 
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher tous les commentaires', error }))
}

exports.getComment = (req, res, next) => {
    const id        = req.params.id
    const postId    = req.params.postId

    Comment.findOne({ 
        where: { 
            id:     id, 
            postId: postId 
        }, 
        include: { 
            model: User 
        }
    })
    .then(comment => {
        if(comment) {
            res.status(200).json(comment)
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé' })
        }
    })
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher ce commentaire', error }))
}

exports.modifyComment = (req, res, next) => {
    const id        = req.params.id
    const postId    = req.params.postId
    const userId    = req.body.userId

    const updateComment = {
        content: req.body.content
    }

    Comment.update(updateComment, {
        where: {
            id:         id,
            postId:     postId,
            userId:     userId
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire modifié avec succès' }))
    .catch(error => res.status(400).json({ message: 'Impossible de modifier ce commentaire', error }))
}

exports.deleteComment = (req, res, next) => {
    const id        = req.params.id
    const postId    = req.params.postId
    const userId    = req.body.userId

    Comment.findOne({ where: { id: id }})
        .then(comment => {
            if(!comment) return res.status(404).json({ error: new Error("Commentaire inexistant !") })

            if (comment.userId !== req.auth.userId) {
                return res.status(401).json({ error: new Error('Requète non authorisé !') })
            }

            Comment.destroy( {
                where: {
                    id:     id,
                    postId: postId,
                    userId: userId
                }
            })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
            .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce commentaire', error }))
        })
}

exports.deleteCommentByAdmin = (req, res, next) => {
    const id        = req.params.id
    const postId    = req.params.postId
    const isAdmin   = req.auth.isAdmin

    if (isAdmin === false) {
        return res.status(401).json({ error: new Error('Vous n\'avez pas les authorizations !') })
    }

    Comment.destroy({
        where: {
            id:     id,
            postId: postId
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce commentaire', error }))
}