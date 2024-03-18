document.querySelector('.rules').addEventListener("click", function () {
    document.querySelector('.rules-modal').style.display = "block";
})

document.querySelector('.cross').addEventListener("click", function () {
    document.querySelector('.rules-modal').style.display = "none";
})

const elements = ["stone", "paper", "scissor"];
const prior = [["stone", "scissor"], ["scissor", "paper"], ["paper", "stone"]];

const userScoreBox = document.querySelector('#userScoreBox');
const compScoreBox = document.querySelector('#compScoreBox');
const buttonNext = document.querySelector('.next');

let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;

userScoreBox.textContent = userScore;
compScoreBox.textContent = compScore;

document.querySelectorAll('.items').forEach(function (e) {
    e.addEventListener('click', chooseItems);
});

function chooseItems() {
    user = this.id;
    comp = elements[Math.floor(Math.random() * elements.length)];
    const result = compareChoices(user, comp);

    document.querySelector(".status").style.display = "flex";
    document.querySelector(".playground").style.display = "none";

    if (result.winner) {
        document.querySelector("." + result.winner + "Picked .circle").style.display = "block";
        document.querySelector("." + result.opponent + "Picked .circle").style.display = "none";
    } else {
        document.querySelector(".userPicked .circle, .compPicked .circle").style.display = "none";
    }

    document.querySelector(".userPicked img").src = "images/" + user + ".png";
    document.querySelector(".compPicked img").src = "images/" + comp + ".png";

    const playResult = document.querySelector(".status .playResult");
    playResult.innerHTML = ''; playResult.innerHTML = result.text;

    document.querySelector('.status .playAgain').addEventListener("click", function () {
        buttonNext.style.display = "none";
        document.querySelector(".status").style.display = "none";
        document.querySelector(".playground").style.display = "block";
    })
}

function compareChoices(choice1, choice2) {
    for (let i = 0; i < prior.length; i++) {
        if (prior[i][0] === choice1 && prior[i][1] === choice2) {
            userScore++;
            userScoreBox.textContent = userScore;
            localStorage.setItem('userScore', userScore);
            buttonNext.style.display = "block";

            return {
                text: '<h2>YOU WIN</h2><h4>AGAINST PC</h4><button class="playAgain">PLAY AGAIN</button>',
                winner: 'user',
                opponent: 'comp'
            };
        } else if (prior[i][0] === choice2 && prior[i][1] === choice1) {
            compScore++;
            compScoreBox.textContent = compScore;
            localStorage.setItem('compScore', compScore);
            buttonNext.style.display = "none";

            return {
                text: '<h2>YOU LOST</h2><h4>AGAINST PC</h4><button class="playAgain">PLAY AGAIN</button>',
                winner: 'comp',
                opponent: 'user'
            };
        }
    }

    buttonNext.style.display = "none";
    return {
        text: '<h2>TIE UP</h2><button class="playAgain">REPLAY</button>',
        winner: '',
        opponent: ''
    };
}