import Component from './component.js';
import { Select, Input, Button } from './form.js';
import { renderCards } from './renderCards.js';

export class Filter extends Component {
    constructor(cards) {
        super()
        this.cards = cards;
        this.filterCards = null;
    }

    filterForUrgency = (e) => {
        const value = e.target.value;
        if(value !== 'Все') {
            this.filterCards = this.filterCards ? 
                this.filterCards.filter(card => card.urgency === value) 
            : 
                this.cards.filter(card => card.urgency === value)
        } 
        else {
            this.filterCards = this.cards;
        }
        renderCards(this.filterCards)
    }

    handleSearch = () => {
        const input = document.getElementsByName('search')[0]
        const value = input.value;
        if(value !== '') {
            this.filterCards = this.filterCards ? 
                this.filterCards.filter(card => card.purposeOfVisit.toUpperCase().includes(value.toUpperCase()))
            :
                this.cards.filter(card => card.purposeOfVisit.toUpperCase().includes(value.toUpperCase()))
        } else {
            this.filterCards = this.cards;
        }
        renderCards(this.filterCards)
    }

    render() {
        const filterDiv = document.querySelector('.filter')
        this.inputSearch = new Input('text', 'search', 'Search', ['form-control'], '', this.handleSearch)
        this.searchButton = new Button('button', 'Search', ['btn', 'btn-info'], this.handleSearch)
        this.selectUrgency = new Select(['Все', 'Обычная', 'Приоритетная', 'Неотложная'], 'urgency', this.filterForUrgency)
        filterDiv.append(this.inputSearch.render(), this.selectUrgency.render(), this.searchButton.render())
    }
}

export const filter = new Filter();