import Component from './component.js';
import { modal } from './modal.js';
import { Form } from './form.js';
import { editCard } from './apiUrl.js';
import { renderCards } from './renderCards.js';

export class EditCard extends Component {
    constructor(cardInfo){
        super()
        this.cardInfo = cardInfo;
    }

    handleEditCard = (e) => {
        const elements = e.target.elements;
        let formData = { id: this.cardInfo.id }
        this.editFormFields.forEach(el => {
            if(el.name){
                formData = {...formData, [el.name]: elements[el.name].value}
            }
        })
        editCard(this.cardInfo.id, formData).then(response => {
            if(response) {
                renderCards()
                modal.hide()
            }
        })
    }

    renderEditForm() {
        this.editFormFields = [];
        for(let key in this.cardInfo) {
            if(key !== 'id' && key !== 'urgency' && key !== 'description') {
                this.editFormFields.push({
                    typeField: 'input', type: 'text', name: key, placeholder: '', value: this.cardInfo[key]
                })
            }
            if(key == 'urgency') {
                this.editFormFields.push({
                    typeField: 'select', name: 'urgency', options: ['Обычная', 'Приоритетная', 'Неотложная'], value: this.cardInfo[key]
                })
            }
            if(key == 'description') {
                this.editFormFields.push({
                    typeField: 'textarea', type: 'textarea', name: 'description', placeholder: 'Описание', value: this.cardInfo[key]
                })
            }
            if(key == 'pastDiseases') {
                this.editFormFields.push({
                    typeField: 'textarea', type: 'textarea', name: 'pastDiseases', placeholder: 'Перенесенные заболевания сердечно-сосудистой системы', value: this.cardInfo[key]
                })
            }
        }

        this.editFormFields.push(
            {typeField: 'button', type: 'submit', text: 'Edit', functionClick: this.handleEditCard}
        )

        this.editForm = new Form(this.editFormFields);

        return this.editForm.render()

    }

    render() {
        document.body.prepend(modal.render('Edit card', this.renderEditForm()));
        modal.show();
    }
}