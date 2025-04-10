const {createServer} = require('http');
const express = require('express');
const dotenv = require('dotenv');


dotenv.config();
const app = require('./config/router-factory');

app.use(bodyParser.json());

const http = createServer(app);

process.on('SIGINT', () => http.close((error) => {
    if (error) {
        console.log(`${error.name}: ${error.message}`);
    }
    process.exit(error ? 1 : 0);
}));

app.get(
    '/', (_, res) => res.send('<h1>Ola<h1>')


)

app.post('/', function(req, res){
    const nome = req.body.nome;
    res.send(`Olá ${nome}!`);

})

http.listen(process.env.PORT, () => console.log(`Servidor iniciado ${process.env.PORT}`));