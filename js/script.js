import { modal } from "./modal.js";
import {createVisit} from './createVisit.js';
import {enterForm} from './enterForm.js';

const enterBtn = document.querySelector('#enter-btn');
const createVisitBtn = document.querySelector('.create-visit-btn');

createVisitBtn.addEventListener('click', function(){  
    document.body.prepend(modal.render('Create visit', createVisit.render()));
    modal.show();
})
enterBtn.addEventListener('click', function(){  
    document.body.prepend(modal.render('Registration', enterForm.render() ));
    modal.show();
})