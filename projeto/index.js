class celular {
    constructor () {
        this.cor = 'Prata';
    }
    ligar() {
        console.log('Realizando uma Ligação');
        return 'Ligando';
    }
}
let objeto = new celular();

console.log(objeto.ligar());