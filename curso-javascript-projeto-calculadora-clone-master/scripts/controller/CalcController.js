class CalcController {

    constructor () {

        this._lastOperator = '';
        this._lastNumber = '';

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
        this.setLastNumberToDisplay();
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll() {
        //LIMPAR DISPLAY DA CALCULADORA 
        this._operation = [];
        this.setLastNumberToDisplay();
        this._lastNumber = '';
        this._lastOperator = '';
    }

    clearEntry() {
        //REMOVE A ULTIMA POSIÇÃO DO ARRAY
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    //TROCAR OPERADOR
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    //RECUPERAR ULIMA POSIÇÃO
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }
    //ENVIAR PARA O ARRAY
    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
        }
    }
    getResult() {

        return eval(this._operation.join(''));
    }
    //FUNCAO CALCULAR
    calc() {
        let last = '';
        this._lastOperator = this.getLastItem();
        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }
        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }
        //console.log('this._lastNumber', this._lastNumber);
        //console.log('this._lastOperator', this._lastOperator);

        let result = this.getResult();
        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
        this.setLastNumberToDisplay();
    }
    //ATUALIZAR DISPLAY
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }
    //PEGAR ULTIMA POSIÇÃO
    getLastItem(isOperator = true) {
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    addOperation(value) {
        //STRING
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {
                //TROCAR O OPERADOR
                this.setLastOperation(value);

            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                //ADICIONA UMA NOVA INFORMAÇÃO NO ARRAY
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                //ATUALIZAR DISPLAY.se
                this.setLastNumberToDisplay();
            }

        }

        // console.log('LINHA 87', this._operation)
    }

    setError() {
        this.displayCalc = "Error";
    }

    addDot() {
        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
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
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot('.');
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