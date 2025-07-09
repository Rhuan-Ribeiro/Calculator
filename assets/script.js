const display = document.querySelector('.display');

/**
 * Adiciona um caractere ao visor da calculadora.
 * @param {string} character - O caractere a ser adicionado.
 */
function addCharacter(character) {
    display.value += character;
}

/**
 * Limpa o conteúdo do visor.
 */
function clearDisplay() {
    display.value = '';
}

/**
 * Inverte o sinal do número atual no visor.
 */
function invertSign() {
    if (display.value) {
        display.value = String(parseFloat(display.value) * -1);
    }
}

/**
 * Realiza o cálculo da expressão atual no visor.
 * Em caso de erro ou expressão inválida, exibe "Error".
 */
function calculate() {
    try {
        // Remove caracteres indesejados para evitar uso inseguro do eval
        const sanitizedExpression = display.value.replace(/[^-()\d/*+.]/g, '');
        display.value = eval(sanitizedExpression);
    } catch (error) {
        display.value = 'Error';
    }
}

/**
 * Escuta eventos do teclado físico e executa ações correspondentes:
 * - Números e operadores: adicionam ao visor.
 * - Enter ou =: calcula.
 * - Backspace: apaga último caractere.
 * - Escape: limpa.
 * - . ou ,: adiciona ponto decimal.
 */
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        // Teclas numéricas (0-9)
        addCharacter(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        addCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        // Remove o último caractere
        display.value = display.value.slice(0, -1);
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.' || key === ',') {
        addCharacter('.');
    }
});