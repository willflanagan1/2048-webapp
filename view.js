import Game from "./engine/game.js";
import jquery from "./node_modules/jquery";

let $root = $('#root');

export const loadPage = function () {
    $(".menu-container").remove();
    $(".row-container").remove();
    let game = new Game(4);
    loadGame(game);
    loadMenu(game);

    document.addEventListener("keyup", function(event) {
        var key = event.key;
        $(".menu-container").remove();
        $(".row-container").remove();

        if (key == "ArrowLeft") {
            key = "left";
            game.move(key);
        } else if (key == "ArrowRight") {
            key = "right";
            game.move(key);
        } else if (key == "ArrowUp") {
            key = "up";
            game.move(key);
        } else if (key == "ArrowDown") {
            key = "down";
            game.move(key);
        }
        loadGame(game);
        loadMenu(game);
    });

}

export const loadGame = function(gameState) {
    var numberOfRows = Math.sqrt(gameState.board.length);
    let rowContainer = document.createElement('div');
    rowContainer.classList.add("row-container");

    let menuContainer = document.createElement('div');
    menuContainer.classList.add("menu-container");

    $root.append(menuContainer);
    $root.append(rowContainer);
    createTileRows(gameState.board, numberOfRows);
    if(gameState.won) {
        alert("You won! Exit this alert to continue playing.")
    }
    if(gameState.over) {
        alert("You lost! Press New Game to play again.")
    }
};


export const loadMenu = function (gameState) {
    var div = document.getElementsByClassName("menu-container");
    var requiredDiv = div[0];

    let scoreBoard = document.createElement('div');
    scoreBoard.id = "scoreboard";
    scoreBoard.innerHTML = "Score: " + gameState.score;

    let newGame = document.createElement('button');
    newGame.id = "new-game";
    newGame.classList.add("button", "is-primary");
    newGame.innerHTML = "NEW GAME";

    let instructions = document.createElement('button');
    instructions.id = "instructions";
    instructions.classList.add("button")
    instructions.innerHTML = "Instructions";

    requiredDiv.append(scoreBoard);
    requiredDiv.append(newGame);
    requiredDiv.append(instructions);
    document.getElementById("new-game").addEventListener("click", function(){
        gameState.over = false;
        gameState.won = false;
        gameState.score = 0;
        loadPage();
    });
    document.getElementById("instructions").addEventListener("click", function(){
        alert(`Instructions:
        Slide tiles with the same values together
        using the arrows on your keyboard. When two tiles
        with the same value slide together, their values
        are added up and placed on the tile that was slid into.
        After every move either a 2 or 4 is placed on the board.
        Game is over when there are no possible tiles to slide
        and the board is full.
        To win: Slide two '1024' tiles together to make the golden
        '2048' tile appear.`)
    });
}

export const createTileRows = function (tileNumbers, numberOfRows) {
    var x = 0;
    var tilesPerRow = numberOfRows;
    var div = document.getElementsByClassName("row-container");
    var requiredDiv = div[0];
    for (var i = 0; i < numberOfRows; i++) {
        let tileRowContainer = document.createElement('div');
        tileRowContainer.classList.add("tile-row-container");
        requiredDiv.append(tileRowContainer);
        for (var t = 0; t < tilesPerRow; t++) {
            let tile = document.createElement('div');
            tile.classList.add("tile");
            //insert if statements to figure out number on tile and add class to tile accordingly
            if (tileNumbers[x] == 0) {
                tile.style.backgroundColor = "rgba(238, 228, 218, 0.35)";
            }
            if (tileNumbers[x] == 2) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#eee4da";
                tile.style.paddingLeft = "60px";
            }
            if (tileNumbers[x] == 4) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#ede0c8";
                tile.style.paddingLeft = "60px";
            }
            if (tileNumbers[x] == 8) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#f2b179";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "60px";
            }
            if (tileNumbers[x] == 16) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#f59563";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "45px";
            }
            if (tileNumbers[x] == 32) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#f67c5f";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "42px";
            }
            if (tileNumbers[x] == 64) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#f65e3b";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "40px";
            }
            if (tileNumbers[x] == 128) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#edcf72";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "26.5px";
            }
            if (tileNumbers[x] == 256) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#edcc61";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "24px";
            }
            if (tileNumbers[x] == 512) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#edc850";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "25px";
            }
            if (tileNumbers[x] == 1024) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#edc53f";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "8.5px";
            }
            if (tileNumbers[x] == 2048) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#edc22e";
                tile.style.color = "#f9f6f2"
                tile.style.paddingLeft = "8.5px";
                tile.style.fontSize = "56px"
            }
            if (tileNumbers[x] == 4096) {
                tile.innerText = tileNumbers[x];
                tile.style.backgroundColor = "#3c3a32";
                tile.style.color = "white";
                tile.style.paddingLeft = "7px";
                tile.style.fontSize = "55px"
            }
            tileRowContainer.append(tile);
            x++;
        }
    }
};

$(document).ready(loadPage());
