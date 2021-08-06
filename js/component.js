class Component {
    constructor() {}
    createElement(elemType, classNames = [], text) {
        const element = document.createElement(elemType);
        if (text) { element.textContent = text; }
        element.classList.add(...classNames);
        return element
    }
    removeClass(element, className) {
        element.classList.remove(className)
    }
    addClass(element, className) {
        element.classList.add(className)
    }
    hasClass(element, className) {
        element.classList.contains(className)
    }
}
export default Component;