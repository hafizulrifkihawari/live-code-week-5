const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    if(req.headers.access_token){
        req.user = jwt.verify(req.headers.access_token, 'APTX4869')
        next()
    } else {
        next (createError(401, 'Invalid Token'))
    }
}