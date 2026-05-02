const playBoard = document.querySelector(".play-board");
const scoreBoard = document.querySelector(".score");
const highScoreBoard = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX=5, snakeY=5;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = parseInt(localStorage.getItem("high-score")) || 0;
highScoreBoard.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    //Passing random 0-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    //Clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
} 

const changeDirection = (e) => {
    //Changing velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();  
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Check food collision
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        console.log(snakeBody);
        score++;

        highScore = score>= highScore? score: highScore;
        localStorage.setItem("high-score", highScore);
        scoreBoard.innerText = `Score: ${score}`;
        highScoreBoard.innerText = `High Score: ${highScore}`;
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        //shifting forward the values of the elements in the snakebody by one
            snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY];  //setting first element of the snake body to current snake position

    // Updating the snake's head position based on the current velocity
    snakeX+=velocityX;
    snakeY+=velocityY;

    //Checking if the snake's head is out of the wall, if so, setting gameOver to true
   if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
}

    // Render snake
    for(let i = 0; i < snakeBody.length; i++){
        //Adding a div for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //Checking if the snake's head collides with any part of its body, if so, setting gameOver to true
        if(i!=0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125); 
initGame();
document.addEventListener("keydown", changeDirection);