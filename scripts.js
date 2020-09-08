window.onload = function () {
  canvas = document.querySelector("#board");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", direction);
  setInterval(game, 200);
};

let snakePosX = 0;
let snakePosY = 0;
const grid = 20;
let applePosX = Math.floor(Math.random() * grid);
let applePosY = Math.floor(Math.random() * grid);
let changePosX = 0;
let changePosY = 0;
const snake = [];
let snakeLength = 3;
let counter = 0;
let points = document.querySelector('.counter');
points.innerHTML = counter;


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
    counter+=100;
    applePosX = Math.floor(Math.random() * grid);
    applePosY = Math.floor(Math.random() * grid);
    console.log(counter);
    points.innerHTML = counter;

  }
}

function drawSnake() {
  //rysuje snejka
  ctx.fillStyle = "#424242";

  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid-2, grid-2);
    if (snake[i].x === snakePosX && snake[i].y === snakePosY) {
      //wykrywa zderzenie z samym sobą
      snakeLength = 3; //po zderzeniu resetuje długość snejka
      counter = 0;
      points.innerHTML = counter;
    }
  }

  snake.unshift({ x: snakePosX, y: snakePosY });

  // usuwa tył snejka
  while (snake.length > snakeLength) {
    snake.pop();
  }
}

function drawBackground() {
  ctx.fillStyle = "#c4c4c4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawApple() {
  ctx.fillStyle = "#D14657";
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