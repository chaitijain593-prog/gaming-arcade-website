const gameContainer = document.querySelector('.game');
const livesDisplay = document.querySelector('.lives');
const gameOverDisplay = document.querySelector('.game-over');
const winDisplay = document.querySelector('.win');

let lives = 10;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardsymbols=['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍒'];
const cards = [...cardsymbols, ...cardsymbols];
cards.sort(() => 0.5 - Math.random()); // to ensure different layout in each game

function createCard() {
    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("data-symbol", symbol);
        card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${symbol}</div>
        `;

        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
    });
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
function checkForMatch(){
    lockBoard = true;
    const ismatch = firstCard.getAttribute("data-symbol") === secondCard.getAttribute("data-symbol");
    if(ismatch){
        disableCards();
    } else {
        unflipCards();
    }
}
function disableCards(){
    resetBoard();
    if(document.querySelectorAll(".card.flipped").length === cards.length){
        endgame(true);

    }
}
function unflipCards() {
    lives--;
    livesDisplay.textContent = `Lives: ${lives}`;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
    
    if (lives === 0) {
        endgame(false);
    }
}
function resetBoard(){
    [firstCard, secondCard,lockBoard] = [null, null, false];

}   
function endgame(win){
    gameContainer.style.display = "none";
    if(win){
        winDisplay.style.display = "block";
    } else {
        gameOverDisplay.style.display = "block";
    }
}
createCard();

