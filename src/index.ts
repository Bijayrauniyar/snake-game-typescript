import { Food } from './food.js';
import { Canvas } from './canvas.js';
import { Keys, Colors } from './constants.js';

let gameCanvas: HTMLCanvasElement;

interface Point {
  x: number;
  y: number;
}
let snake: Array<Point>;

// Horizontal velocity
let dx: number = 10;
// Vertical velocity
let dy: number = 0;
let changingDirection: boolean = false;
// The user's score
let score: number = 0;
// let foodX: number;
// let foodY: number;
let gameSpeed: number = 100;

// Get the canvas element
gameCanvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

// change direction on keypress
document.addEventListener('keydown', changeDirection);

snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

// create board & canvas
const canvas = new Canvas(300, 300, 0, 0);
canvas.init(gameCanvas);

// create food obj
const food = new Food(canvas);

//const snakeObj = new Snake(food, canvas);

gameLoop();
food.createFood();

function gameLoop() {
  if (didGameEnd()) return;
  setTimeout(function onTick() {
    changingDirection = false;
    canvas.clearCanvas();
    food.drawFood();
    moveSnake();
    drawSnake();
    // Call gameLoop again
    gameLoop();
  }, gameSpeed);
}

/**
 * moving the snake by changing the x-coordinates of its parts
 * according to the horizontal velocity and the y-coordinates of its parts
 * according to the vertical veolocity
 */
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  const didEatFood = snake[0].x === food.foodX && snake[0].y === food.foodY;
  if (didEatFood) {
    score += 10;
    document.getElementById('score')!.innerHTML = score.toString();
    food.createFood();
  } else {
    snake.pop();
  }
}

// draw the snake on the canvas
function drawSnakePart(snakePart: { x: number; y: number }) {
  Canvas.context.fillStyle = Colors.SNAKE_COLOUR;
  Canvas.context.strokeStyle = Colors.SNAKE_BORDER_COLOUR;
  Canvas.context.fillRect(snakePart.x, snakePart.y, 10, 10);
  Canvas.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.map(snakePart => drawSnakePart(snakePart));
}

// End the game
function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (didCollide) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function changeDirection(event: KeyboardEvent) {
  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === Keys.LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === Keys.UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === Keys.RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === Keys.DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}
