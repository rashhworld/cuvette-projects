document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.key:not(.reset):not(.delete):not(.equals)');
    const display = document.querySelector('.display');
    let isFirstClick = true;

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            if (isFirstClick) {
                display.innerText = '';
                isFirstClick = false;
            }

            const lastChar = display.innerText.slice(-1);
            const currentChar = button.textContent;
            const operators = ['+', '-', '*', '/', '.'];

            if (operators.includes(lastChar) && operators.includes(currentChar)) {
                display.innerText = display.innerText.slice(0, -1) + currentChar;
            } else {
                display.innerText += currentChar;
            }
        });
    });

    document.querySelector('.delete').addEventListener("click", function () {
        display.innerText = display.innerText.slice(0, -1);
    })

    document.querySelector('.reset').addEventListener("click", function () {
        display.innerText = '0';
        isFirstClick = true;
    })

    document.querySelector('.equals').addEventListener("click", function () {
        try {
            if (display.innerText.length > 0) display.innerText = eval(display.textContent);
        } catch (error) { }
    })
});