//IIFE for the gameboard
const Gameboard = (() => {
  //A 3x3 array
  let gameboard = Array(9).fill('');
  console.log(gameboard);

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
    while (gameActive) {
      console.log(nowPlaying);
      let squareSelect = prompt('Choose a square (0-8): ');
      squareSelect = parseInt(squareSelect);

      if (!isNaN(squareSelect) && squareSelect >= 0 && squareSelect <= 8) {
        //First game

        if (Gameboard.updateGameboard(squareSelect, nowPlaying.symbol)) {
          console.log('You chose: ' + squareSelect);
          console.log('Updated gameboard:', Gameboard.gameboard);
          //Verify game conditions
          if (checkWinner() || checkFullBoard()) {
            if (resetGame()) {
            } else {
              gameActive = false;
              break;
            }
          }

          //Player change
          nowPlaying === playerX
            ? (nowPlaying = playerO)
            : (nowPlaying = playerX);
        } else {
          console.log('Square already occupied. Try again');
        }
      } else {
        console.log('Invalid input');
      }
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
      if (
        Gameboard.gameboard[a] !== '' &&
        Gameboard.gameboard[a] === Gameboard.gameboard[b] &&
        Gameboard.gameboard[a] === Gameboard.gameboard[c]
      ) {
        alert(`Congratulatios! ${nowPlaying.symbol} wins!`);
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
      alert('Its a draw! :(');
    }
    return isFull;
  };

  const resetGame = () => {
    let answer;
    do {
      answer = prompt('Do you want to play again? (yes / no)');
      answer = answer ? answer.toLowerCase() : '';
    } while (answer !== 'yes' && answer !== 'no');
    if (answer === 'yes') {
      Gameboard.resetGameboard();
      nowPlaying = playerX;
      return true;
    } else {
      return false;
    }
  };

  //Returning public method (function to play a turn)
  return {
    playTurn,
  };
})();

//Execute the game
game.playTurn();
