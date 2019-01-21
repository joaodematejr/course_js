let celular = function () {

    this.cor = 'Prata';
    this.ligar = function () {
        console.log('Realizando uma Ligação');
        return 'Ligando'
    }

};

let objeto = new celular();

console.log(objeto.ligar());