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

  return {
    gameboard,
    updateGameboard,
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

console.log(playerX);
console.log(playerO);

//IIFE for the game
const game = (() => {
  //First player is always X
  let nowPlaying = playerX;
  //Player change
  let squareSelect = prompt('Choose a square (0-8): ');

  //First game
  if (Gameboard.updateGameboard(squareSelect, nowPlaying.symbol)) {
    console.log('You chose: ' + squareSelect);
    console.log('Updated gameboard:', Gameboard.gameboard);
  } else {
    console.log('Square already occupied. Try again');
  }

  //Second game ... not coded yet
  nowPlaying === playerX ? (nowPlaying = playerO) : (nowPlaying = playerX);

  console.log(nowPlaying);
  return {
    nowPlaying,
  };
  1;
})();
