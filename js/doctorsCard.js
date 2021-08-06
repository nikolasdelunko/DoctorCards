import Component from './component.js';
import { deleteCard } from './apiUrl.js';
import { renderCards } from './renderCards.js';
import { EditCard } from './editCard.js';

export class AllCards extends Component {
    constructor(cards) {
        super()
        this.cards = cards;
    }

    render() {
        const wrapperCards = document.querySelector('.wrapper-cards')
        if(this.cards.length === 0) {
            wrapperCards.innerHTML = ''
            this.noItems = this.createElement('div',['no-items'], 'No items have been added...')
            wrapperCards.append(this.noItems)

        } else {
            wrapperCards.innerHTML = '';
            this.cards.forEach(card => {
                const renderCard = new Card(card);
                wrapperCards.append(renderCard.render())
            });
        }
        return wrapperCards
    }

}


export class Card extends Component {
    constructor(cardInfo) {
        super()
        this.cardInfo = cardInfo
    }

    deleteCard = () => {
        deleteCard(this.cardInfo.id).then(res => {
            renderCards()
        })
    }

    renderHeaderCard = () => {
        this.header = this.createElement('div', ['header-card']);
        this.deleteIcon = this.createElement('i', ['bi', 'bi-trash'])
        this.deleteIcon.addEventListener('click', this.deleteCard)
        this.editIcon = this.createElement('i', ['bi', 'bi-pencil']);
        this.editIcon.addEventListener('click', () => {
            this.editCard = new EditCard(this.cardInfo);
            this.editCard.render();
        })
        this.doctor = this.createElement('p', ['card-text'], `Визит к ${this.cardInfo.doctor}у`)
        this.fullName = this.createElement('p', ['card-text'], `ФИО: ${this.cardInfo.fullName}`)
        const leadMoreButton = this.createElement('p', ['card-btn-load'], 'LOAD MORE')
        leadMoreButton.addEventListener('click' , () => {
            const body = document.querySelector(`.card-body-${this.cardInfo.id}`)
            body.style.display = 'block';
            leadMoreButton.style.display = 'none';
        })
        this.header.append(this.editIcon, this.deleteIcon, this.doctor, this.fullName, leadMoreButton)
        return this.header
    }

    renderBody() {
        this.body = this.createElement('div', [`card-body-${this.cardInfo.id}`]);
        this.body.style.display = 'none';
        const bodyElement = [];
        for(let key in this.cardInfo){
            if(this.cardInfo[key] !== this.cardInfo.doctor && this.cardInfo[key] !== this.cardInfo.fullName && this.cardInfo[key] !== this.cardInfo.id) {
                let el = this.createElement('p', ['card-text'], this.cardInfo[key])
                bodyElement.push(el)
            }
        }
        this.body.append(...bodyElement)
        return this.body
    }


    render() {
        this.card = this.createElement('div', ['card']);
        this.card.append(this.renderHeaderCard(), this.renderBody())
        return this.card
    }
}



