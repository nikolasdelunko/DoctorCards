import Component from "./component.js"
export class Modal extends Component {
    constructor() {
        super();
    }

    show = () => {
        this.addClass(this.modalContainer, 'show');
    }
    
    hide = () => {
        this.removeClass(this.modalContainer, 'show');
        this.modalContainer.remove()
    }

    renderHeader(titleText) {
        this.modalHeader = this.createElement('div', ['modal-header']);
        this.header = this.createElement('h4', ['header'], titleText);
        this.close = this.createElement('i', ['bi', 'bi-x']);
        this.close.addEventListener('click', this.hide)
        this.modalHeader.append(this.header, this.close)
        return this.modalHeader
    }

    renderBody(bodyText) {
        this.modalBody = this.createElement('div', ['modal-body']);
        this.modalBody.append(bodyText)
        return this.modalBody
    }

    renderFooter() {
        this.modalFooter = this.createElement('div', ['modal-footer']);
        this.button = this.createElement('button',['btn', 'btn-default'],'Cancel');
        this.button.addEventListener('click', this.hide)
        this.modalFooter.append(this.button)
        
        return this.modalFooter
    }

    render(titleText, bodyText) {
        this.modalContainer = this.createElement('div', ['modal']);
        this.modalContainer.addEventListener('click', this.hide)
        const modalDialog = this.createElement('div', ['modal-dialog']);
        const modalContent = this.createElement('div', ['modal-content']);
        modalContent.addEventListener('click', (e) => e.stopPropagation())
        this.modalContainer.append(modalDialog);
        modalDialog.append(modalContent);
        modalContent.append(this.renderHeader(titleText), this.renderBody(bodyText), this.renderFooter())
        return this.modalContainer;
    }
}
export const modal = new Modal();
export const modalRender = modal.render();