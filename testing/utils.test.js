import { checkUserInput, translateEnglish, translateMorse } from '../scripts/utils.js';

describe('Tests checkUserInput()', () => {
    it('Should throw an error for invalid input', () => {
        expect(checkUserInput('English', 'abcde')).toBeFalsy();
        expect(checkUserInput('morSe', 'abcde')).toBeFalsy();
        expect(checkUserInput(2, 'abcde')).toBeFalsy();
        expect(checkUserInput('english', 2)).toBeFalsy();
        expect(checkUserInput('morse', -3)).toBeFalsy();
    });

    it('\'english\' should return true for strings with only letters and whitespace', () => {
        expect(checkUserInput('english', 'z')).toBeTruthy();
        expect(checkUserInput('english', 'AbcDe')).toBeTruthy();
        expect(checkUserInput('english', 'abcd e')).toBeTruthy();
        expect(checkUserInput('english', 'abcd  e')).toBeTruthy();
        expect(checkUserInput('english', 'abcd\ne')).toBeTruthy();
        expect(checkUserInput('english', 'a b  c    d\ne')).toBeTruthy();
        expect(checkUserInput('english', '     Ab      E    z   E')).toBeTruthy();
        expect(checkUserInput('english', 'hi j  k lmn oPqRsTuv  Wxyz')).toBeTruthy();
    });

    it('\'english\' should return true when there\'s punctuation/other choice characters', () => {
        expect(checkUserInput('english', 'abcd,e')).toBeTruthy();
        expect(checkUserInput('english', 'abcd,e')).toBeTruthy();
        expect(checkUserInput('english', ';')).toBeTruthy();
        expect(checkUserInput('english', ';A-z.    , /$  ?"\'-')).toBeTruthy();
    });

    it('\'english\' should return true when there\'s numbers', () => {
        expect(checkUserInput('english', 'abcd,e2')).toBeTruthy();
        expect(checkUserInput('english', '1')).toBeTruthy();
        expect(checkUserInput('english', '0123456789')).toBeTruthy();
        expect(checkUserInput('english', '0, 1; 2/ 3" 4\' 5.   6 7 8 9')).toBeTruthy();
    });

    it('\'morse\' should return true for simple words', () => {
        expect(checkUserInput('morse', '.... . .-.. .-.. ---')).toBeTruthy();
        expect(checkUserInput('morse', '-.-. .- -')).toBeTruthy();
    });

    it('\'morse\' should return true for simple phrases', () => {
        expect(checkUserInput('morse', '.... .. / - .... . .-. .')).toBeTruthy();
        expect(checkUserInput('morse', '--. --- --- -.. / -.. .- -.--')).toBeTruthy();
    });

    it('\'morse\' should return true for extra white space in single words and phrases', () => {
        expect(checkUserInput('morse', '.... .  .-..  .-..      ---')).toBeTruthy();
        expect(checkUserInput('morse', '-. ---     /     - ....  .- -. -.- ...')).toBeTruthy();
    });

    it('\'morse\' should return true for numbers and punctuation', () => {
        expect(checkUserInput('morse', '.----  / ..--- /  - ....  .-. .   .')).toBeTruthy();
        expect(checkUserInput('morse', '.---- ..--.. /  ..---   ..--..')).toBeTruthy();
    });

    it('\'morse\' should return false when there\'s a \'/\' inside a \'morse char\'', () => {
        expect(checkUserInput('morse', '.- -... -.-. -/..')).toBeFalsy();
        expect(checkUserInput('morse', '--.. -.-- -./.- .--')).toBeFalsy();
    });

});

describe('Tests translateEnglish()', () => {
    it('Should work for simple \'words\'', () => {
        expect(translateEnglish('abcd')).toBe('.- -... -.-. -..');
        expect(translateEnglish('ABCD')).toBe('.- -... -.-. -..');
    });

    it('Should work for strings with whitespace', () => {
        expect(translateEnglish('a b c d ')).toBe('.- / -... / -.-. / -..');
        expect(translateEnglish(' A b   c D  e')).toBe('.- / -... / -.-. / -.. / .');
    });

    it('Should work for numbers', () => {
        expect(translateEnglish('abc    123')).toBe('.- -... -.-. / .---- ..--- ...--');
    });

    it('Should work for punctuation', () => {
        expect(translateEnglish('x, y, z; 1     2   3.')).toBe('-..- --..-- / -.-- --..-- / --.. -.-.-. / .---- / ..--- / ...-- .-.-.-');
    });
});

describe('Tests translateMorse()', () => {
    it('Should return -1 for invalid input', () => {
        expect(translateMorse('.- -../. -.-.')).toBe(-1);
        expect(translateMorse('--.. -.-- -.e-')).toBe(-1);
        expect(translateMorse('-.- --- .-.. 1')).toBe(-1);
    });

    it('Should work for simple \'words\'', () => {
        expect(translateMorse('-.. --- --.')).toBe('DOG');
        expect(translateMorse('.--. --- - .- - ---')).toBe('POTATO');
    });

    it('Should work for phrases/whitespace', () => {
        expect(translateMorse('.. /     .-.. .. -.- .  /   - --- /  -.-. --- -.. .')).toBe('I LIKE TO CODE');
        expect(translateMorse('.. / .-.. .. -.- .           /  - ---  /  .--. .-.. .- -.--     /     ... .--. --- .-. - ...')).toBe('I LIKE TO PLAY SPORTS');
    });

    it('Should work for numbers', () => {
        expect(translateMorse('.---- / ..--- / ...-- / ....- / ..... -.... --... ---.. ----.')).toBe('1 2 3 4 56789');
        expect(translateMorse('.---- ..--- ...-- ....- / --- -. . / - .-- --- / - .... .-. . . / ..-. --- ..- .-.')).toBe('1234 ONE TWO THREE FOUR');
    });

    it('Should work for punctuation', () => {
        expect(translateMorse('.---- --..-- / - .-- --- --..-- / - .... .-. . . --..-- / ....-')).toBe('1, TWO, THREE, 4');
        expect(translateMorse('.---- --..-- / ..--- .-.-.- / ...-- -....- / ....- -..-. .....')).toBe('1, 2. 3- 4/5');
    });
});