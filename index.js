// Gameboard module - an IIFE - to create variables that are private.
const Gameboard = (() => {
  // store gameboard as an array inside a Gameboard Object.
  let gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((box, index) => {
      boardHTML += `<div class="box" id="box-${index}">${box}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const boxes = document.querySelectorAll(".box");
    // console.log(boxes);
    boxes.forEach((box) => {
      box.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    // when value is inputed, we want to render the gameboard with the updated values.
    render();
  };

  // the only purpose of this function is to return the gameboard. it cannot be modified. also known as an accessor function.
  const getGameboard = () => gameboard;

  return {
    render,
    update,
    getGameboard,
  };
})();

// create player factory - because we will create multiple players
const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const checkForWin = (board) => {
  const winningCombinations = [
    [0, 2, 3],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    // checks that the board is not empty and that the markers match in each box
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
};

const checkForTie = (board) => {
  return board.every((cell) => cell !== "");
};

// Game controller module
const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  const handleClick = (event) => {
    // alert("Clicked");
    // console.log(event);
    // split to separate the string. parseInt to change the the string 1 into an integer
    let index = parseInt(event.target.id.split("-")[1]);
    // console.log(index);
    if (Gameboard.getGameboard()[index] !== "") return;

    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;

      // let winner = "";
      // document.querySelector("#winner").innerHTML = winner;
      // if (gameOver === true) {
      //   winner = `${players[currentPlayerIndex].name} won!`;
      // }

      alert(`${players[currentPlayerIndex].name} won!`);
    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      alert("it's a tie. try again?");
    }

    // handles the change from player to player 2
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    Gameboard.render();
  };

  return {
    start,
    handleClick,
    restart,
  };
})();

const startGame = document.querySelector("#start-game");
startGame.addEventListener("click", () => {
  Game.start();
});

const restartGame = document.querySelector("#restart-game");
restartGame.addEventListener("click", () => {
  Game.restart();
});
