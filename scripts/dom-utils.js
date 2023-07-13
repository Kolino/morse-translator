export const appendTextEl = (elType, text, parentEl, classes) => {
    const newTextEl = document.createElement(elType);
    newTextEl.classList.add(...classes);
    const newTextNode = document.createTextNode(text);

    newTextEl.appendChild(newTextNode);
    parentEl.appendChild(newTextEl);
};