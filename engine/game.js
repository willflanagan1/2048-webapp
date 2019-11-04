export default class Game {

    constructor(size) {
        this.size = size;
        this.board = [];
        this.createBoard(size);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.moveListeners = [];
        this.winListeners = [];
        this.loseListeners = [];
        this.listeners = true;
        this.randomTile();
        this.randomTile();
    }

    setupNewGame() {
        this.board = [];
        this.createBoard(this.size);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.moveListeners = [];
        this.winListeners = [];
        this.loseListeners = [];
        this.listeners = true;
        this.randomTile();
        this.randomTile();
    }

    createBoard(size) {
        for (var i = 0; i < size * size; i++) {
            this.board.push(0)
        }
    }

    loadGame(gameState) {
        this.board = gameState.board;
        this.score = gameState.score;
        this.won = gameState.won;
        this.over = gameState.over;
        this.size = (Math.sqrt(gameState.board.length));
        this.listeners = true;
    }

    move(direction) {
        let moveDirection = function(direction, board) {
            var keyPress = direction;
            var tileMove = false;
            switch (keyPress) {
                case 'left':
                    tileMove = tileMove || board.moveHorizontal('left');
                    break;
                case 'right':
                    tileMove = tileMove || board.moveHorizontal('right');
                    break;
                case 'down':
                    tileMove = tileMove || board.moveVertical('down');
                    break;
                case 'up':
                    tileMove = tileMove || board.moveVertical('up');
                    break;
            }
            return tileMove;
        }
        if (moveDirection(direction, this)) {
            this.randomTile();
            if (this.listeners) {
                this.moveListeners.forEach(obj => obj(this.getGameState()));
                this.winOrLose();
            }
        }
    }

    moveVertical(direction) {
        var board = this.board;
        var tileMove = false;
        if (direction == 'down') {
            for (var j = 0; j < this.size; j++) {
                var tilesTogether = this.size - 1;
                for (var x = this.size - 1; x >= 0; x--) {
                    var index = x * this.size + j;
                    if (board[index] == 0) {
                        continue;
                    }
                    for (var k = x + 1; k <= tilesTogether; k++) {
                        if (board[k * this.size + j] == 0) {
                            board[k * this.size + j] = board[index];
                            board[index] = 0;
                            index += this.size;
                            tileMove = true;
                            continue;
                        } else if (board[k * this.size + j]
                            == board[index]) {
                            board[k * this.size + j] = board[k * this.size + j] * 2;
                            board[index] = 0;
                            this.score += board[k * this.size + j];
                            tilesTogether -= 1;
                            tileMove = true;
                            break;
                        } else {
                            tilesTogether -= 1;
                            break;
                        }
                    }
                }
            }
        } else {
            for (var j = 0; j < this.size; j++) {
                var tilesTogether = 0;
                for (var x = 0; x < this.size; x++) {
                    var index = x * this.size + j;
                    if (board[index] == 0) {
                        continue;
                    }
                    for (var k = x - 1; k >= tilesTogether; k--) {
                        if (board[k * this.size + j] == 0) {
                            board[k * this.size + j] = board[index];
                            board[index] = 0;
                            index -= this.size;
                            tileMove = true;
                            continue;
                        } else if (board[k * this.size + j]
                            == board[index]) {
                            board[k * this.size + j] = board[k * this.size + j] * 2;
                            board[index] = 0;
                            this.score += board[k * this.size + j];
                            tilesTogether += 1;
                            tileMove = true;
                            break;
                        } else {
                            tilesTogether += 1;
                            break;
                        }
                    }
                }
            }
        }
        return tileMove;
    }

    moveHorizontal(direction) {
        var board = this.board;
        var tileMove = false;
        if (direction == 'left') {
            for (var x = 0; x < this.size; x++) {
                var tilesTogether = 0;
                for (var j = 0; j < this.size; j++) {
                    var index = x * this.size + j;
                    if (board[index] == 0) {
                        continue;
                    }
                    for (var k = j - 1; k >= tilesTogether; k--) {
                        if (board[x * this.size + k] == 0) {
                            board[x * this.size + k] = board[index];
                            board[index] = 0;
                            index -= 1;
                            tileMove = true;
                            continue;
                        } else if (board[x * this.size + k]
                            == board[index]) {
                            board[x * this.size + k] = board[x * this.size + k] * 2;
                            board[index] = 0;
                            this.score += board[x * this.size + k];

                            tilesTogether += 1;
                            tileMove = true;
                            break;
                        } else {
                            tilesTogether += 1;
                            break;
                        }
                    }
                }
            }
        } else {
            for (var x = 0; x < this.size; x++) { // Each row
                var tilesTogether = this.size - 1;
                for (var j = this.size - 1; j >= 0; j--) { // Each column/row
                    var index = x * this.size + j;
                    if (board[index] == 0) {
                        continue;
                    }
                    for (var k = j + 1; k <= tilesTogether; k++) {
                        if (board[x * this.size + k] == 0) {
                            board[x * this.size + k] = board[index];
                            board[index] = 0;
                            index += 1;
                            tileMove = true;
                            continue;
                        } else if (board[x * this.size + k]
                            == board[index]) {
                            board[x * this.size + k] = board[x * this.size + k] * 2;
                            board[index] = 0;
                            this.score += board[x * this.size + k];
                            tilesTogether -= 1;
                            tileMove = true;
                            break;
                        } else {
                            tilesTogether -= 1;
                            break;
                        }
                    }
                }
            }
        }
        return tileMove;
    }

    onMove(callback) {
        this.moveListeners.push(callback);
    }

    onWin(callback) {
        this.winListeners.push(callback);
    }

    onLose(callback) {
        this.loseListeners.push(callback);
    }

    randomTile() {
        var randomNumbers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        var index = Math.floor(Math.random() * 10);
        var randomNumber = randomNumbers[index];

        var x = 0;
        var boardIndex = Math.floor(Math.random() * (this.size * this.size));
        while (x < 100) {
            if (this.board[boardIndex] != 0) {
                var secondIndex = Math.floor(Math.random() * (this.size * this.size) - 1);
                if (secondIndex >= boardIndex) secondIndex++;
                boardIndex = secondIndex;
            } else {
                this.board[boardIndex] = randomNumber;
                break;
            }
            x++;
        }
    }

    winOrLose() {
        this.board.forEach(obj => {
            if (obj == 2048) {
                this.won = true;
            }
        });

        if (!this.possibleMove()) {
            this.over = true;
        }

        if (this.won) {
            this.winListeners.forEach(obj => obj(this.getGameState()));
        }

        if (this.over) {
            this.loseListeners.forEach(obj => obj(this.getGameState()));
        }

        return (this.won || this.over)
    }

    possibleMove() {
        this.listeners = false;
        var originalBoard = this.board.slice(0);
        var originalScore = this.score;

        this.move("right");
        var right = this.board.slice(0);
        this.board = originalBoard.slice(0);
        this.move("left");
        var left = this.board.slice(0);
        this.board = originalBoard.slice(0);
        this.move("up");
        var up = this.board.slice(0);
        this.board = originalBoard.slice(0);
        this.move("down");
        var down = this.board.slice(0);
        this.board = originalBoard.slice(0);

        for (var t = 0; t < this.board.length; t++) {
            if (up[t] != originalBoard[t] || down[t] != originalBoard[t] || left[t] != originalBoard[t] || right[t] != originalBoard[t]) {
                this.listeners = true;
                this.score = originalScore;
                return true;
            }
        }
        this.listeners = true;
        this.score = originalScore;
        return false;
    }

    toString() {
        var myString = "";
        var i = 0;
        this.board.forEach(tile => {
            myString += ("[" + tile + "]");
            i++;
            if (i % this.size !== 0) {
                myString += " ";
            } else {
                myString += "\n";
            }
        });
        return myString;
    }

    getGameState() {
        return {
            board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        };
    }
}