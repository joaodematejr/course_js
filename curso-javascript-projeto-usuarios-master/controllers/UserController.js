class UserController {
    constructor(formId, tableId) {
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    }

    onSubmit() {
        this.formEl.addEventListener('submit', event => {
            event.preventDefault();
            let btn = this.formEl.querySelector('[type=submit');
            btn.disable = true;
            let values = this.getValues();
            this.getPhoto().then(
                (content) => {
                    values.photo = content;
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disable = false;
                },
                (e) => {
                    console.error(e);
                });
        });
    }

    getPhoto() {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let element = [...this.formEl.elements].filter(item => {
                if (item.name === 'photo') {
                    return item;
                }
            });

            let file = element[0].files[0];
            //SUCESSO
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            //ERRO
            fileReader.erro = () => {
                reject(e);
            }
            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }


        });
    }

    getValues() {
        let user = {};
        [...this.formEl.elements].forEach(function (field, index) {


            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                return false;

            }


            if (field.name == 'gender') {
                if (field.checked) {
                    user[field.name] = field.value;
                }
            } else if (field.name == 'admin') {
                user[field.name] = field.checked;
            } else {
                user[field.name] = field.value;
            }
        });
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.phoyo, user.admin);
    }

    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>
            <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin ? 'Sim' : 'Não')}</td>
                    <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>`

        this.tableEl.appendChild(tr);

    }

}