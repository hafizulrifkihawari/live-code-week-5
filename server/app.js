require('dotenv').config()

const cors = require('cors')

const express = require('express')
const app = express()
const PORT = 3000

const route = require('./routes/route')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(route)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})
