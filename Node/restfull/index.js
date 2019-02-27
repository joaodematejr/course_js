const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Context-Type', 'text/html');
    res.end('<h1>Olá</h1>');
});

app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Context-Type', 'application/json');
    res.json({
        users: [{
            name: 'João',
            email: 'joao@email.com',
            id: 1
        }]
    });
});

app.listen(3000, '127.0.0.1', () => {
    console.log('Servidor Rodando !');
});
