import { Canvas } from './canvas.js';
import { Colors, Keys } from './constants.js';
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
    Snake.prototype.didGameEnd = function () {
        for (var i = 4; i < this.food.snake.length; i++) {
            var didCollide = this.food.snake[i].x === this.food.snake[0].x &&
                this.food.snake[i].y === this.food.snake[0].y;
            if (didCollide)
                return true;
        }
        var hitLeftWall = this.food.snake[0].x < 0;
        var hitRightWall = this.food.snake[0].x > this.canvas.width - 10;
        var hitToptWall = this.food.snake[0].y < 0;
        var hitBottomWall = this.food.snake[0].y > this.canvas.height - 10;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    };
    Snake.prototype.changeDirection = function (event) {
        // if (changingDirection) return;
        // changingDirection = true;
        console.log('direct', event);
        var keyPressed = event.keyCode;
        var goingUp = this.dy === -10;
        var goingDown = this.dy === 10;
        var goingRight = this.dx === 10;
        var goingLeft = this.dx === -10;
        console.log(keyPressed);
        if (keyPressed === Keys.LEFT_KEY && !goingRight) {
            this.dx = -10;
            this.dy = 0;
        }
        if (keyPressed === Keys.UP_KEY && !goingDown) {
            this.dx = 0;
            this.dy = -10;
        }
        if (keyPressed === Keys.RIGHT_KEY && !goingLeft) {
            this.dx = 10;
            this.dy = 0;
        }
        if (keyPressed === Keys.DOWN_KEY && !goingUp) {
            this.dx = 0;
            this.dy = 10;
        }
    };
    return Snake;
}());
export { Snake };
