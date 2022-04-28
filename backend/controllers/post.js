const Post = require('../models').Post
const User = require('../models').User

exports.createPost = (req, res, next) => {
    console.log('req', req.body);
    const post = {
        idUsers: req.body.idUsers,
        title: req.body.title,
        content: req.body.content,
        imageUrl: null
    }

    Post.create(post)
    .then(() => res.status(201).json({ message: 'Post créé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de créer ce post'}));
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll({ order: [['createdAt', 'DESC']], include: { model: User }})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher tous les posts', error}));
}