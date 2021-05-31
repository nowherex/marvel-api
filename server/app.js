const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config({path: __dirname + '/.env'})

const userRoute = require('./src/routes/userRoute')

app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRoute)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }
    next()
});


app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;