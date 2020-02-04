import { Snake } from './snake.js';
import { Food } from './food.js';
import { Canvas } from './canvas.js';
var gameCanvas;
var gameSpeed = 100;
// Get the canvas element
gameCanvas = document.getElementById('gameCanvas');
var canvas = new Canvas(300, 300, 0, 0);
canvas.init(gameCanvas);
// create food obj
var food = new Food(canvas);
// create snake
var snake = new Snake(food, canvas);
document.addEventListener('keydown', function (event) {
    snake.changeDirection(event);
});
gameLoop();
food.createFood();
function gameLoop() {
    if (snake.didGameEnd())
        return;
    setTimeout(function onTick() {
        canvas.clearCanvas();
        food.drawFood();
        snake.moveSnake();
        snake.drawSnake();
        // Call gameLoop again
        gameLoop();
    }, gameSpeed);
}
