module.exports = (app) => {
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

    app.get('/users/admin', (req, res) => {
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
};