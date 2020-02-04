import { Colors } from './constants.js';
import { Canvas } from './canvas.js';
var Food = /** @class */ (function () {
    function Food(canvas) {
        this.foodX = 0;
        this.foodY = 0;
        this.canvas = canvas;
        // initial snake
        this.snake = [
            { x: 150, y: 150 },
            { x: 140, y: 150 },
            { x: 130, y: 150 },
            { x: 120, y: 150 },
            { x: 110, y: 150 }
        ];
    }
    Food.prototype.randomTen = function (min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    };
    Food.prototype.createFood = function () {
        var _this = this;
        this.foodX = this.randomTen(0, this.canvas.width - 10);
        this.foodY = this.randomTen(0, this.canvas.height - 10);
        this.snake.forEach(function (part) {
            var foodIsOnSnake = part.x == _this.foodX && part.y == _this.foodY;
            if (foodIsOnSnake)
                _this.createFood();
        });
    };
    Food.prototype.drawFood = function () {
        Canvas.context.fillStyle = Colors.FOOD_COLOUR;
        Canvas.context.strokeStyle = Colors.FOOD_BORDER_COLOUR;
        Canvas.context.fillRect(this.foodX, this.foodY, 10, 10);
        Canvas.context.strokeRect(this.foodX, this.foodY, 10, 10);
    };
    return Food;
}());
export { Food };
