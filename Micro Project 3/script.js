document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.key:not(.reset):not(.delete):not(.equals)');
    const display = document.querySelector('.display');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            display.innerText += button.textContent;
        });
    });

    document.querySelector('.delete').addEventListener("click", function () {
        display.innerText = display.innerText.slice(0, -1);
    })

    document.querySelector('.reset').addEventListener("click", function () {
        display.innerText = '';
    })

    document.querySelector('.equals').addEventListener("click", function () {
        try {
            if (display.innerText.length > 0) display.innerText = eval(display.textContent);
        } catch (error) { }
    })
});