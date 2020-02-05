import { Snake } from './snake.js';
import { Food } from './food.js';
import { Canvas } from './canvas.js';

let gameCanvas: HTMLCanvasElement;

let gameSpeed: number = 100;

// Get the canvas element
gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

// create canvas objs
const canvas = new Canvas(300, 300, 0, 0);
canvas.init(gameCanvas);

// create food obj
const food = new Food(canvas);

// create snake
const snake = new Snake(food, canvas);

document.addEventListener('keydown', event => {
  snake.changeDirection(event);
});
gameLoop();
food.createFood();

function gameLoop() {
  if (snake.didGameEnd()) return;
  setTimeout(function onTick() {
    canvas.clearCanvas();
    food.drawFood();
    snake.moveSnake();
    snake.drawSnake();
    // Call gameLoop again
    gameLoop();
  }, gameSpeed);
}
