import { Canvas } from './canvas.js';
import { Colors } from './constants.js';
var Snake = /** @class */ (function () {
    function Snake(food, canvas) {
        this.foodX = 0;
        this.foodY = 0;
        this.score = 0;
        // Horizontal velocity
        this.dx = 10;
        // Vertical velocity
        this.dy = 0;
        this.food = food;
        this.canvas = canvas;
    }
    Snake.prototype.drawSnakePart = function (snakePart) {
        Canvas.context.fillStyle = Colors.SNAKE_COLOUR;
        Canvas.context.strokeStyle = Colors.SNAKE_BORDER_COLOUR;
        Canvas.context.fillRect(snakePart.x, snakePart.y, 10, 10);
        Canvas.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
    };
    Snake.prototype.drawSnake = function () {
        var _this = this;
        this.food.snake.map(function (snakePart) { return _this.drawSnakePart(snakePart); });
    };
    Snake.prototype.moveSnake = function () {
        var head = {
            x: this.food.snake[0].x + this.dx,
            y: this.food.snake[0].y + this.dy
        };
        this.food.snake.unshift(head);
        var didEatFood = this.food.snake[0].x === this.food.foodX &&
            this.food.snake[0].y === this.food.foodY;
        if (didEatFood) {
            this.score += 10;
            document.getElementById('score').innerHTML = this.score.toString();
            this.food.createFood();
        }
        else {
            this.food.snake.pop();
        }
    };
    return Snake;
}());
export { Snake };
