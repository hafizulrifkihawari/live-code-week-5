'use strict'

const { Comic } = require('../models')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

class comicController {
    static showAll(req, res, next){
        Comic
            .findAll()
            .then(comics => {
                res.status(200).json(comics)
            })
            .catch(err => {
                res.status(400).json({ errors: 'Bad Request' })
            })
    }

    static updateComic(req, res, next){
        // console.log('masuk')

        const { title, author, imageUrl } = req.body
        const id = req.params.id

        Comic
            .findOne({
                where: {
                    id:id
                }
            })
            .then(comic => {
                if(comic){
                    return comic.update({
                        title,
                        author,
                        imageUrl
                    }, {
                        returning: true
                    })
                } else {
                    throw createError(404, 'Data not found')
                }
            })
            .then(comic => {
                res.status(200).json({ comic, message:'success update comic' })
            })
            .catch(err => {
                res.status(400)
            })
    }

    static findById(req, res, next){
        let id = req.params.id

        Comic
            .findOne({
                where: {
                    id:id
                }
            })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json('Bad Request')
            })
    }
}

module.exports = comicController