module.exports = app => {
    app.get('/', (req, res) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'text/html');
        res.end('<h1>Olá</h1>');
    });
};