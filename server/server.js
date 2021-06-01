const http = require('http')
const app = require('./app')

require('./src//database')

const port = process.env.PORT
const server = http.createServer(app)
server.listen(port, () => {
    console.log('Servidor rodando na porta', port)
	
});