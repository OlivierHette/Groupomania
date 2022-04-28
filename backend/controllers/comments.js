const Comment = require('../models').Comment
const User = require('../models').User

exports.createComment = (req, res, next) => {
    console.log('Req body: \n', req.body);
    console.log('Req params: \n', req.params);
    const comment = {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content
    }

    Comment.create(comment)
    .then(() => res.status(201).json({ message: 'Commentaire créé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de créer ce commentaire', error }));
}