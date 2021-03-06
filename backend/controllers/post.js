const {Post, User} = require('../models')
const fs    = require('fs')

exports.createPost = (req, res, next) => {
    const post = new Post({
        userId:     req.body.userId,
        title:      req.body.title,
        content:    null,
        imageUrl:   req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    })
    post.save()
    .then(() => res.status(201).json({ message: 'Post crée avec succès' }))
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
    const postId = req.params.id
    const userId = req.auth.userId
    
    const postObject = req.file ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : { ...req.body }
    
    Post.update(postObject, {
        where: {
            id: postId,
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

        if(!post) return res.status(404).json({ error: new Error("Post inexistant !") })

        if(post.userId !== req.auth.userId) {
            return res.status(401).json({ error: new Error('Requète non authorisé !') })
        }
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
    const id        = req.params.id
    const isAdmin   = req.auth.isAdmin
    
    Post.findOne({ where: { id: id } })
    .then(post => {

        if(!post) return res.status(404).json({ error: new Error("Post inexistant !") })

        if (isAdmin === false) {
            return res.status(401).json({ error: new Error('Vous n\'avez pas les authorizations !') })
        }

        if (post.imageUrl) {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { 
                        id: id, 
                    }
                })
                .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
                .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));
            })
        } else {
            Post.destroy({ where: { 
                    id: id,
                }
            })
            .then(() => res.status(200).json({ message: 'Post supprimé avec succès' }))
            .catch(error => res.status(400).json({ error: 'Impossible de supprimer ce post', error }));
        }
    })
    .catch(error => res.status(500).json({ error }))
}