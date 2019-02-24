class UserController {
    constructor(formIdCreate, formIdUpdate, tableId) {
        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
        this.onEditCancel();
        this.onEdit();
        this.selectAll();
    }

    onEditCancel() {
        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', e => {
            this.showPanelCreate();
        });
    }

    onEdit() {
        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', e => {
            this.showPanelCreate();
        });
        this.formUpdateEl.addEventListener('submit', event => {
            event.preventDefault();
            let btn = this.formUpdateEl.querySelector('[type=submit');
            btn.disable = true;
            let values = this.getValues(this.formUpdateEl);
            let index = this.formUpdateEl.dataset.trIndex;
            let tr = this.tableEl.rows[index];
            let userOld = JSON.parse(tr.dataset.user);
            let result = Object.assign({}, userOld, values)
            this.getPhoto(this.formUpdateEl).then(
                (content) => {
                    if (content === 'dist/img/boxed-bg.jpg') {
                        result._photo = userOld._photo;
                    } else {
                        result._photo = content;
                    }
                    values.photo = content;
                    tr.dataset.user = JSON.stringify(result);
                    tr.innerHTML = `
                    <td>
                        <img src="${result._photo}" alt="User Image" class="img-circle img-sm"></td>
                                <td>${result._name}</td>
                                <td>${result._email}</td>
                                <td>${(result._admin ? 'Sim' : 'Não')}</td>
                                <td>${Utils.dateFormat(result._register)}</td>
                            <td>
                            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                        </td>`;

                    this.addEventsTr(tr);
                    this.updateCount();
                    this.formUpdateEl.reset();
                    btn.disable = false;
                    this.showPanelCreate();
                },
                (e) => {
                    console.error(e);
                }
            );

        });
    }



    onSubmit() {
        this.formEl.addEventListener('submit', event => {
            event.preventDefault();
            let btn = this.formEl.querySelector('[type=submit');
            btn.disable = true;
            let values = this.getValues(this.formEl);
            if (!values) return false;
            this.getPhoto(this.formEl).then(
                (content) => {
                    values.photo = content;
                    this.insert(values);
                    this.addLine(values);
                    this.formEl.reset();
                    btn.disable = false;
                },
                (e) => {
                    console.error(e);
                }
            );
        });
    }

    getPhoto(formEl) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            let element = [...formEl.elements].filter(item => {
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

    getValues(formEl) {
        let user = {};
        let isValid = true;
        [...formEl.elements].forEach(function (field, index) {


            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value) {

                field.parentElement.classList.add('has-error');
                isValid = false;

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
        if (!isValid) {
            return false;
        }
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.phoyo, user.admin);
    }

    getUsersStorage() {
        let users = [];
        if (localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    selectAll() {
        let users = this.getUsersStorage();
        users.forEach(dataUser => {
            let user = new User();
            user.loadFromJSON(dataUser);
            this.addLine(user);
        });

    }

    insert(data) {
        let users = this.getUsersStorage();
        users.push(data);
        //sessionStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users));


    }

    addLine(dataUser) {

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
        <td>
            <img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                    <td>${dataUser.name}</td>
                    <td>${dataUser.email}</td>
                    <td>${(dataUser.admin ? 'Sim' : 'Não')}</td>
                    <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
            </td>`;


        this.addEventsTr(tr);
        this.tableEl.appendChild(tr);
        this.updateCount();

    }

    addEventsTr(tr) {


        tr.querySelector('.btn-delete').addEventListener('click', e => {

            if (confirm('Deseja Realmente Excluir ?')) {
                tr.remove();
                this.updateCount();
            } else {

            }

        });

        tr.querySelector('.btn-edit').addEventListener('click', e => {
            let json = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {

                let field = this.formUpdateEl.querySelector('[name=' + name.replace('_', '') + ']');

                if (field) {
                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];

                    }

                }

            }
            this.formUpdateEl.querySelector('.photo').src = json._photo;
            this.showPanelUpdate();
        });
    }

    showPanelCreate() {
        document.querySelector('#box-user-create').style.display = 'block';
        document.querySelector('#box-user-update').style.display = 'none';
    }

    showPanelUpdate() {
        document.querySelector('#box-user-create').style.display = 'none';
        document.querySelector('#box-user-update').style.display = 'block';
    }



    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach(tr => {

            numberUsers++;
            let user = JSON.parse(tr.dataset.user);
            if (user._admin) numberAdmin++;

        });

        document.querySelector('#number-users').innerHTML = numberUsers;
        document.querySelector('#number-users-admin').innerHTML = numberAdmin;

    }

}