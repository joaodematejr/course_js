module.exports = {
    user: (app, req, res) => {
        req.assert('nome', 'o nome é obrigatorio').notEmpty();
        req.assert('email', 'o email esta invalido').notEmpty().isEmail();
        let errors = req.validationErrors();
        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }
    }
};