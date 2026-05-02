let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let highScore = localStorage.getItem("high-score") || 0;

window.onload = function() {
    setGame();
   
    document.getElementById("high-score").innerText = "High Score: " + highScore;
}

function setGame() {
    for (let i = 0; i < 9; i++) { 
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000); 
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";
    
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;
    
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";
    
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;
    
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;

     
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("high-score", highScore);
            document.getElementById("high-score").innerText = "High Score: " + highScore;
        }
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score;
        gameOver = true;

        
        let sessionGames = parseInt(sessionStorage.getItem("games-played") || 0);
        sessionStorage.setItem("games-played", sessionGames + 1);
        
        console.log("Session Game Count: ", sessionStorage.getItem("games-played"));
    }
}