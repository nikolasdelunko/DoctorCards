import Component from './component.js';

export class Form extends Component {
    constructor(config) {
        super()
        this.config = config;
    }
    render() {
        this.containerForm = this.createElement('form', ['form-horizontal'])
        const items = this.config.map(configItem => {
            let element;
            if (configItem.typeField === 'input') {
                const { type, name, placeholder, value, handlerChange } = configItem
                let input = new Input(type, name, placeholder, ['input-form', 'form-control'], value, handlerChange);
                element = input.render()
            }
            if (configItem.typeField === 'select') {
                const { handlerChange, name, options, value } = configItem
                let select = new Select(options, name, handlerChange, ['form-control'], value);
                element = select.render()
            }
            if (configItem.typeField === 'textarea') {
                const { name, placeholder, value } = configItem
                let textarea = new Textarea(name, ['form-control'], placeholder, value);
                element = textarea.render()
            }
            if (configItem.typeField === 'button') {
                const { type, text, functionClick } = configItem;
                this.containerForm.addEventListener('submit', function(e){
                    e.preventDefault();
                    functionClick(e);
                })
                let button = new Button(type, text, ['btn', 'btn-info'], functionClick);
                element = button.render()
            }
            return element
        })
        this.containerForm.append(...items)
        return this.containerForm
    }
}

export class Input extends Component {
    constructor(type, name, placeholder = '', className = ['form-control'], value = '', handlerChange){
        super()
        this.type = type;
        this.name = name;
        this.className = className;
        this.placeholder = placeholder;
        this.handlerChange = handlerChange;
        this.value = value;
    }

    render() {
        this.input = this.createElement('input', this.className)
        this.input.type = this.type;
        this.input.name = this.name;
        this.input.placeholder = this.placeholder;
        if(this.value){this.input.value = this.value}
        this.input.addEventListener('change', this.handlerChange);
        return this.input
    }
}

export class Select extends Component {
    constructor(options = [], name, handlerChange, className = ['form-control'], value = ''){
        super()
        this.options = options;
        this.name = name;
        this.className = className;
        this.value = value;
        this.handlerChange = handlerChange;
    }

    render() {
        this.select = this.createElement('select', this.className)
        this.select.name = this.name;
        this.select.value = this.value;
        this.options.forEach(el => {
            this.option = this.createElement('option', ['option'], el)
            if(this.value == el) {this.option.selected = true}
            this.option.value = el;
            this.select.appendChild(this.option);
        })
        this.select.addEventListener('change', this.handlerChange)
        return this.select
    }
}

export class Textarea extends Component {
    constructor(name, className, placeholder = '', value = '', handlerChange){
        super()
        this.name = name;
        this.className = className;
        this.handlerChange = handlerChange;
        this.value = value;
        this.placeholder = placeholder;
    }

    render() {
        this.textarea = this.createElement('textarea', this.className)
        this.textarea.name = this.name;
        this.textarea.placeholder = this.placeholder;
        this.textarea.value = this.value;

        return this.textarea
    }
}

export class Button extends Component {
    constructor(type, text, className, handlerClick){
        super()
        this.type = type;
        this.text = text;
        this.className = className;
        this.handlerClick = handlerClick;
    }

    render() {
        this.button = this.createElement('button', this.className, this.text);
        this.button.type = this.type;
        this.button.addEventListener('click', this.handlerClick);
        return this.button
    }
}