import { getCards } from './apiUrl.js';
import { AllCards } from './doctorsCard.js';

export const renderCards = async (filterCards) => {
    let cards
    if(filterCards) { cards = filterCards } 
    else { cards = await getCards() }
    const renderCards = new AllCards(cards);
    renderCards.render();
}