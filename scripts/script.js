import { checkUserInput, translateEnglish, translateMorse } from './utils.js';
import { appendTextEl } from './dom-utils.js';

const inputBox = document.querySelector('#inputBox');
inputBox.value = '';

const inputForm = document.querySelector('.input-sctn__input-form');
inputForm.addEventListener('submit', e => {
    e.preventDefault();

    const output = document.querySelector('.output-sctn__output');
    if (output.hasChildNodes())
        output.removeChild(output.lastChild);

    const startLang = document.querySelector('#startLang');
    if (!checkUserInput(startLang.value, inputBox.value)) {
        appendTextEl('p', 'Error: invalid input.', output, []);
    }
    else {
        if (startLang.value === 'english')
            appendTextEl('p', translateEnglish(inputBox.value), output, []);
        else {
            appendTextEl('p', translateMorse(inputBox.value), output, []);
        }
    }

    inputBox.value = '';
});