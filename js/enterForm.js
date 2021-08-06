import Component from './component.js';
import { Form } from './form.js';
import { autorization, getCards } from './apiUrl.js';
import { modal } from './modal.js';
import { renderCards } from './renderCards.js';
import { Filter } from './filter.js';

class EnterForm extends Component {
    constructor(){
        super()
        this.createEnterForm = [
            {typeField: 'input', type: 'text', name: 'email', placeholder: 'e-mail'},
            {typeField: 'input', type: 'password', name: 'password', placeholder: 'password'},
            {typeField: 'button', type: 'submit', text: 'Login', functionClick: this.login},
        ]
    }
    
    login = (form) => {
        const enterBtn = document.querySelector('#enter-btn');
        const createVisitBtn = document.querySelector('.create-visit-btn');
        const email = form.target['email'].value;
        const password = form.target['password'].value;
        autorization(email, password)
        .then( async res => {
            if(res) {
                enterBtn.style.display = 'none';
                createVisitBtn.style.display = 'block';
                modal.hide()
                const cards = await getCards();
                const filter = new Filter(cards);
                filter.render()
                renderCards()
            }
        })
    }

    render() {
        const enterForm = new Form(this.createEnterForm);
        return enterForm.render();
    }

}
export const enterForm  = new EnterForm();

