class CalcController {

    constructor () {
        this._operation = [];
        this._locate = 'pt-br';
        this._displayCalcE1 = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }
    clearAll() {
        //LIMPAR DISPLAY DA CALCULADORA 
        this._operation = [];
    }
    clearEntry() {
        //REMOVE A ULTIMA POSIÇÃO DO ARRAY
        this._operation.pop();
    }
    addOperation(value) {
        //ADICIONA UMA NOVA INFORMAÇÃO NO ARRAY
        this._operation.push(value);
        console.log(this._operation)

    }
    setError() {
        this.displayCalc = "Error";
    }
    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':

                break;
            case 'subtracao':

                break;
            case 'divisao':

                break;
            case 'multiplicacao':

                break;
            case 'porcento':

                break;
            case 'igual':

                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace('btn-', '');

                this.execBtn(textBtn);

            });
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = 'pointer';
            });

        })
    }
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locate, { day: '2-digit', month: 'long', year: 'numeric' });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locate);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }
    get displayCalc() {
        return this._displayCalcE1.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcE1.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(valor) {
        this.currentDate = valor;
    }
}