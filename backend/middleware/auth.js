const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token         = req.headers.authorization.split(' ')[1]
        const decodedToken  = jwt.verify(token, 'RANDOM_TOKEN')
        const userId        = decodedToken.userId
        const isAdmin       = decodedToken.isAdmin
        req.auth            = {userId, isAdmin}

        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID not valid'
        } else {
            next()
        }
        
    } catch (error) {
        res.status(401).json({ error: error  | 'Request not authentificate'})
    }
}