//IIFE for the gameboard
const Gameboard = (() => {
  //A 3x3 array for the board
  let gameboard = Array(9).fill('');

  //Method to update the board
  const updateGameboard = (position, symbol) => {
    if (gameboard[position] === '') {
      gameboard[position] = symbol;
      return true;
    } else {
      return false;
    }
  };

  //Method to reset the board
  const resetGameboard = () => {
    //Change all array elements to ''

    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = '';
      console.log(gameboard);
    }
  };

  return {
    gameboard,
    updateGameboard,
    resetGameboard,
  };
})();

//Player factory
const Player = (symbol) => {
  return {
    symbol: symbol,
  };
};

//Player instances
const playerX = Player('X');
const playerO = Player('O');

//IIFE for the game
const game = (() => {
  //First player is always X
  let nowPlaying = playerX;

  //Game active true until a winner or a draw
  let gameActive = true;

  //Principal PUBLIC game METHOD
  const playTurn = () => {
    if (gameActive) {
      DOMcontroller.gameStatus(); //Draw Player turn status
      DOMcontroller.drawEvent(); //Draw nowPlaying symbol in the gameboard
      console.log(Gameboard.gameboard);
      if (checkWinner()) {
        gameActive = false;
      } else if (checkFullBoard()) {
        gameActive = false;
      }
    } else {
    }
  };

  //Function to check if there is any winner
  const checkWinner = () => {
    const winningConditions = [
      //Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      //Cross
      [0, 4, 8],
      [2, 4, 6],
      //Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    for (let conditions of winningConditions) {
      const [a, b, c] = conditions;
      let winnerSymbol;
      if (
        Gameboard.gameboard[a] !== '' &&
        Gameboard.gameboard[a] === Gameboard.gameboard[b] &&
        Gameboard.gameboard[a] === Gameboard.gameboard[c]
      ) {
        winnerSymbol = Gameboard.gameboard[a];
        DOMcontroller.gameWinner(winnerSymbol);
        return true; //There´s a winner
      }
    }

    return false;
  };

  //Function to check if the board is full
  const checkFullBoard = () => {
    let isFull = false;
    isFull = Gameboard.gameboard.every((element) => element !== '');
    if (isFull) {
      DOMcontroller.gameTie();
    }
    return isFull;
  };

  const getNowPlaying = () => {
    return nowPlaying;
  };

  const getGameActive = () => {
    return gameActive;
  };

  // Method to update the current player
  const updateNowPlaying = (player) => {
    nowPlaying = player;
  };

  const updateGameActive = (condition) => {
    gameActive = condition;
  };
  //Returning public method (function to play a turn)
  return {
    checkWinner,
    getNowPlaying,
    nowPlaying,
    playTurn,
    getGameActive,
    updateNowPlaying,
    updateGameActive,
  };
})();

const DOMcontroller = (() => {
  const statusText = document.querySelector('.game-status'); //Select status DOM element
  const boardSquares = document.querySelectorAll('.square'); //Select square DOM element
  const newGameBtn = document.querySelector('.new-game'); //Select new game button

  const gameStatus = () => {
    statusText.innerHTML = 'Player ' + game.nowPlaying.symbol + "'s turn";
  };

  const gameWinner = (winnerSymbol) => {
    statusText.innerHTML = 'Player ' + winnerSymbol + "'s Wins!🎉🎉";
  };

  const gameTie = () => {
    statusText.innerHTML = 'It´ a draw! :( 😟';
  };

  const symbolDrawer = (square) => {
    const symbol = game.nowPlaying.symbol;
    square.innerHTML = symbol;
  };

  const drawEvent = () => {
    boardSquares.forEach((square) => {
      square.addEventListener('click', () => {
        const number = square.classList[1];
        const position = parseInt(number) - 1; // Make square number to array index

        if (Gameboard.updateGameboard(position, game.nowPlaying.symbol)) {
          if (game.getGameActive()) {
            symbolDrawer(square); // If the movement is valid, it will draw the symbol

            game.nowPlaying = game.nowPlaying === playerX ? playerO : playerX;
            game.playTurn();
          } else {
          }
        } else {
        }
      });
    });
  };

  const newGame = () => {
    newGameBtn.addEventListener('click', () => {
      Gameboard.resetGameboard(); // reset the gameboard array
      boardSquares.forEach((square) => {
        square.innerHTML = ''; //Fill the divs with blank content
      });
      game.updateGameActive(true); //Active the game again if it was unabled beacuse a winner or a tie
      game.updateNowPlaying(playerX);
      gameStatus();
      drawEvent();
    });
  };

  return {
    newGame,
    gameStatus,
    gameWinner,
    symbolDrawer,
    drawEvent,
    gameTie,
  };
})();

//Execute the game
game.playTurn();
DOMcontroller.newGame();
