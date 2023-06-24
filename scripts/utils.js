// A to Z in morse code
const engToMorse = {
    'A': '.-',
    'B': '-...',
    'C': '-.-.',
    'D': '-..',
    'E': '.',
    'F': '..-.',
    'G': '--.',
    'H': '....',
    'I': '..',
    'J': '.---',
    'K': '-.-',
    'L': '.-..',
    'M': '--',
    'N': '-.',
    'O': '---',
    'P': '.--.',
    'Q': '--.-',
    'R': '.-.',
    'S': '...',
    'T': '-',
    'U': '..-',
    'V': '...-',
    'W': '.--',
    'X': '-..-',
    'Y': '-.--',
    'Z': '--..',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '0': '-----',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    '\'': '.----.',
    ';': '-.-.-.',
    ':': '---...',
    '"': '.-..-.',
    '-': '-....-',
    '/': '-..-.',
    '$': '...-..-'
 };

 const morseToEng = {};
 const engToMorseKeys = Object.keys(engToMorse);
 engToMorseKeys.forEach(key => {
    morseToEng[engToMorse[key]] = key;
 });

export const checkUserInput = (startLang, text) => {
    // Checking input
    if (typeof startLang != 'string' || typeof text != 'string' ||
        (startLang != 'english' && startLang != 'morse'))
        return false;
    
    let testRegex = /[^A-Za-z0-9\s.,?';:"/$-]/;

    // Testing english string
    if (startLang === 'english')
        return !testRegex.test(text);

    // Testing morse string
    testRegex = /[^/.-\s]/;
    if (testRegex.test(text))
        return false;

    return !text.split(/\s+/).some(str => 
        str.includes('/') && (str.includes('.') || str.includes('-'))
    );

    return true;
};

export const translateEnglish = inputStr => {
    if (!checkUserInput('english', inputStr))
        return -1;

    // const inputTrimmed = inputStr.replaceAll(/[\s]/g, '/').split('');
    const trimmedInput = inputStr.trim();
    let retStr = '';
    for (let i = 0; i < trimmedInput.length; i++) {
        // Beginning of some white space
        if (/\s/.test(trimmedInput[i])) {
            retStr += '/ ';
            // Skipping ahead to the first non-white space char
            // (it must be before i = trimmedInput.length - 1)
            while (/\s/.test(trimmedInput[i]))
                ++i;
            // Compensating for the for loop
            --i;
        } 
        else {
            retStr += engToMorse[trimmedInput[i].toUpperCase()] + ' ';
        }
    }
    retStr = retStr.trim();

    return retStr;
};

export const translateMorse = inputStr => {
    if (!checkUserInput('morse', inputStr))
        return -1;

    const inputTrimmed = inputStr.trim().split(/\s+/);

    return inputTrimmed.reduce((engStr, currStr) => {
        if (currStr === '/')
            return engStr + ' ';       
        
        return engStr + morseToEng[currStr];
    }, '');
};