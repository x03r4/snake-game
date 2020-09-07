window.onload = function () {
  canvas = document.querySelector("#board");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", direction);
  setInterval(game, 200);
};

let snakePosX = 0;
let snakePosY = 0;
let grid = 20;
let applePosX = Math.floor(Math.random() * grid);
let applePosY = Math.floor(Math.random() * grid);
let changePosX = 0;
let changePosY = 0;
const snake = [];
let snakeLength = 3;

function direction(e) {
  switch (e.keyCode) {
    case 37:
      changePosX = -1;
      changePosY = 0;
      break;
    case 38:
      changePosX = 0;
      changePosY = -1;
      break;
    case 39:
      changePosX = 1;
      changePosY = 0;
      break;
    case 40:
      changePosX = 0;
      changePosY = 1;
      break;
  }
}

function move() {
  snakePosX = snakePosX + changePosX;
  snakePosY = snakePosY + changePosY;

  // #### pozwala na powracanie z drugiej strony planszy ####
  if (snakePosX < 0) {
    snakePosX = grid - 1;
  }
  if (snakePosX > grid - 1) {
    snakePosX = 0;
  }
  if (snakePosY < 0) {
    snakePosY = grid - 1;
  }
  if (snakePosY > grid - 1) {
    snakePosY = 0;
  }
  // #### ----------- ####
}

function score() {
  if (applePosX === snakePosX && applePosY === snakePosY) {
    snakeLength++;
    applePosX = Math.floor(Math.random() * grid);
    applePosY = Math.floor(Math.random() * grid);
  }
}

function drawSnake() {
  //rysuje snejka
  ctx.fillStyle = "black";

  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid, grid);
    if (snake[i].x === snakePosX && snake[i].y === snakePosY) {
      //wykrywa zderzenie z samym sobą
      snakeLength = 3; //po zderzeniu resetuje długość snejka
    }
  }

  snake.unshift({ x: snakePosX, y: snakePosY });

  // usuwa tył snejka
  while (snake.length > snakeLength) {
    snake.pop();
  }
}

function drawBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(applePosX * grid, applePosY * grid, grid, grid);
}

function game() {
  move(); //pozoruje ruch
  drawBackground(); //rysuje tło
  drawSnake(); //rysuje snake'a
  score(); //sprawdza czy trafiło na jabłko
  drawApple(); //rysuje jabłko
}


//dodać licznik punktów