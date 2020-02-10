'use strict'

const { User } = require('../models')
const jwt = require('jsonwebtoken')
const createErrors = require('http-errors')

class UserController {
    static login(req, res, next){
        // var token = jwt.sign({ foo: 'bar' }, 'shhhhh')

        User
            .findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password
                }
            })
            .then(user => {
                let token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'APTX4869')

                res.status(200).json({ access_token:token })
            })
            .catch(err => {
                res.status(400).json( { errors: 'Incorrect Username or Password' })
            })
    }

    static register(req, res, next){
        const { name, email, password } = req.body
        console.log(req.body)
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                if(!user){
                    return User.create({
                        name,
                        email,
                        password
                    })
                } else {
                    throw (createErrors(400, 'Email already exists'))
                }
            })
            .then(user => {
                let token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, 'APTX4869')

                res.status(201).json({ access_token: token })
            })
            .catch(err => {
                res.status(400).json({ errors: 'Bad Request'})
            })
    }
}

module.exports = UserController