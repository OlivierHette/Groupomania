const Post  = require('../models').Post
const User  = require('../models').User
const fs    = require('fs')

exports.createPost = (req, res, next) => {
    console.log('body 6',req.file);
    const post = {
        userId:     req.body.userId,
        title:      req.body.title,
        // content:    req.body.content,
        content:    null,
        imageUrl:   req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    }
    console.log('body 14', req.file);
    Post.create(post)
    .then(() => res.status(201).json({ message: 'Post créé avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de créer ce post', error}));
}

/**
 * Récuperer grace a l'userId l'username
 */

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']], 
        include: { 
            model: User 
        }
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher tous les posts', error}));
}

exports.getPost = (req, res, next) => {
    const id = req.params.id

    Post.findOne({ 
        where: { 
            id: id 
        }, 
        include: { 
            model: User 
        } 
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error: 'Impossible d\'afficher ce post', error }));
}

exports.modifyPost = (req, res, next) => {
    const id        = req.params.id
    const userId    = req.body.userId

    let updatedPost = {
        title:      req.body.title,
        content:    req.body.content
    }

    if(req.file) updatedPost["imageUrl"] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    Post.update(updatedPost, { 
        where: { 
            id:     id, 
            userId: userId 
        } 
    })
    .then(() => res.status(200).json({ message: 'Post modifié avec succès' }))
    .catch(error => res.status(400).json({ error: 'Impossible de modifier ce post', error }));
}

exports.deletePost = (req, res, next) => {
    const id        = req.params.id
    const userId    = req.body.userId

    Post.findOne({ where: { id: id } })
    .then(post => {
        if (post.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { 
                    id: id, 
                    userId: userId 
                }
            })
            .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
            .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));
            })
        } else {
            Post.destroy({ where: { 
                    id: id, 
                    userId: userId 
                }
            })
            .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
            .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));
        }
    })
    .catch(error => res.status(500).json({ error }))
}

exports.deletePostByAdmin = (req, res, next) => {
    const id = req.params.id

    Post.findOne({where: { id: id } })
    .then(post => {
        if (post.imageUrl) {
            //  SI !isAdmin sortir de la condition -> res.error401
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: id }})
                    .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
                    .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));   
            })
        } else {
            Post.destroy({ where: { id: id }})
                .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
                .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));
        }
    })
    .catch(error => res.status(500).json({ error }))
}