const route = require('express').Router()

const userController = require('../controllers/userController')
const comicController = require('../controllers/comicController')
const authentication = require('../middlewares/authentication')


route.post('/login', userController.login)
route.post('/register', userController.register)
route.get('/comics/:id', authentication, comicController.findById)
route.get('/comics', authentication, comicController.showAll)
route.put('/comics/:id', authentication, comicController.updateComic)


module.exports = route