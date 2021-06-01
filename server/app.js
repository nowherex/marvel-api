const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config({path: __dirname + '/.env'})

const userRoute = require('./src/routes/userRoute')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            description: `Api simples para locação de veículos.`,
            version: "1.0.0",
            title: "Crud API - RentCar",
            contact: {
                email: "leoguedes.14@hotmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));



app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRoute)





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