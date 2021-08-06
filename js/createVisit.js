import Component from './component.js';
import {Form, Select} from './form.js';
import {createVisitForDoctor} from './apiUrl.js';
import { renderCards } from './renderCards.js';
import { modal } from './modal.js';

class CreateVisit extends Component {
    constructor(){
        super()
        this.generalFields = [
            {typeField: 'input', type: 'text', name: 'fullName', placeholder: 'ФИО'},
            {typeField: 'input', type: 'text', name: 'purposeOfVisit', placeholder: 'Цель визита'},
            {typeField: 'select', name: 'urgency', options: ['Обычная', 'Приоритетная', 'Неотложная']},
            {typeField: 'textarea', type: 'textarea', name: 'description', placeholder: 'Описание'},
        ]
    }

    checkWhatDoctor = (e) =>  {
        let value = e.target.value;
        const form = document.querySelector('form')
        if(form){ this.createVisitDiv.removeChild(form) }
        
        if(value === 'Кардиолог') {
            this.currentDoctorForm = new CardiologistForm(this.generalFields)
            return this.createVisitDiv.append(this.currentDoctorForm.render())
        }
        if(value === 'Стоматолог') {
            this.currentDoctorForm = new DantistForm(this.generalFields);
            return this.createVisitDiv.append(this.currentDoctorForm.render())
        }
        if(value === 'Терапевт') {
            this.currentDoctorForm = new TherapistForm(this.generalFields)
            return this.createVisitDiv.append(this.currentDoctorForm.render())
        }
    }

    render() {
        this.createVisitDiv = this.createElement('div', ['create-visit'])
        const select = new Select(['Выберете врача', 'Кардиолог', 'Стоматолог', 'Терапевт'], 'doctor', this.checkWhatDoctor)
        this.createVisitDiv.append(select.render())
        return this.createVisitDiv
    }

}
export const createVisit = new CreateVisit();

class CardiologistForm {
    constructor(generalFields){
        this.generalFields = generalFields;
        this.createVisitForm = [
            ...this.generalFields,
            {typeField: 'input', type: 'text', name: 'pressure', placeholder: 'Обычное давление'},
            {typeField: 'input', type: 'number', name: 'bodyMassIndex', placeholder: 'Индекс массы тела'},
            {typeField: 'textarea', type: 'textarea', name: 'pastDiseases',placeholder: 'Перенесенные заболевания сердечно-сосудистой системы'},
            {typeField: 'input', type: 'number', name: 'age', placeholder: 'Возраст'},
            {typeField: 'button', type: 'submit', text: 'Create', functionClick: this.handlerCreateVisit},
        ]
    }

    handlerCreateVisit = (e) => {
        const elements = e.target.elements;
        let formData = { doctor: 'Кардиолог' }
        this.createVisitForm.forEach(el => {
            if(el.name){
                formData = {...formData, [el.name]: elements[el.name].value}
            }
        })
        createVisitForDoctor(formData).then(response => {
            if(response) {
                renderCards()
                modal.hide()
            }
        })
    }

    render() {
        this.cardiologistForm = new Form(this.createVisitForm);
        return this.cardiologistForm.render()
    }
}

class DantistForm {
    constructor(generalFields){
        this.generalFields = generalFields;
        this.createVisitForm = [
            ...this.generalFields,
            {typeField: 'input', type: 'date', name: 'dateLastVisit', placeholder: 'Дата последнего посещения'},
            {typeField: 'button', type: 'submit', text: 'Create', functionClick: this.handlerCreateVisit},
        ]
    }

    handlerCreateVisit = (e) => {
        const elements = e.target.elements;
        let formData = { doctor: 'Стоматолог' }
        this.createVisitForm.forEach(el => {
            if(el.name){
                formData = {...formData, [el.name]: elements[el.name].value}
            }
        })
        createVisitForDoctor(formData).then(response => {
            if(response) {
                renderCards()
                modal.hide()
            }
        })
    }

    render() {
        this.dantistForm = new Form(this.createVisitForm);
        return this.dantistForm.render()
    }
}

class TherapistForm {
    constructor(generalFields){
        this.generalFields = generalFields;
        this.createVisitForm = [
            ...this.generalFields,
            {typeField: 'input', type: 'number', name: 'age', placeholder: 'Возраст'},
            {typeField: 'button', type: 'submit', text: 'Create', functionClick: this.handlerCreateVisit},
        ]
    }

    handlerCreateVisit = (e) => {
        const elements = e.target.elements;
        let formData = { doctor: 'Терапевт' }
        this.createVisitForm.forEach(el => {
            if(el.name){
                formData = {...formData, [el.name]: elements[el.name].value}
            }
        })
        createVisitForDoctor(formData).then(response => {
            if(response) {
                renderCards()
                modal.hide()
            }
        })
    }

    render() {
        this.therapistForm = new Form(this.createVisitForm);
        return this.therapistForm.render()
    }
}