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

  return {
    render,
  };
})();

// create player factory - because we will create multiple players
const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
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
  };
  return {
    start,
    handleClick,
  };
})();

const startGame = document.querySelector("#start-game");
startGame.addEventListener("click", () => {
  Game.start();
});
