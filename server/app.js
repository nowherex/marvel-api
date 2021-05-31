const express = require('express')
const app = express()
const morgan = require('morgan')

const customerRoute = require('./src/routes/CustomerRoute')
const rentRoute = require('./src/routes/RentRoute')
const carRoutes = require('./src/routes/CarRoute')

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

app.use('/customers', customerRoute)
app.use('/customers', rentRoute)
app.use('/cars', carRoutes)



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