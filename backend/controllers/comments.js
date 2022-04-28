const Comment = require('../models').Comment
const User = require('../models').User

exports.createComment = (req, res, next) => {
    const comment = {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content
    }

    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de créer ce commentaire', error }));
}

exports.getAllComments = (req, res, next) => {
    const postId = req.params.postId

    Comment.findAll({ 
        order: [['createdAt', 'ASC']], 
        where: { postId: postId }, 
        include: { model: User } 
    })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher tous les commentaires', error }));
}