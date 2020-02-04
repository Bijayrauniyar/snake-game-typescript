import { Canvas } from './canvas.js';
import { Colors } from './constants.js';
import { Food } from './food.js';

export class Snake {
  foodX: number = 0;
  foodY: number = 0;
  food: Food;
  canvas: Canvas;
  score: number = 0;
  // Horizontal velocity
  dx: number = 10;
  // Vertical velocity
  dy: number = 0;
  constructor(food: Food, canvas: Canvas) {
    this.food = food;
    this.canvas = canvas;
  }

  private drawSnakePart(snakePart: { x: number; y: number }) {
    Canvas.context.fillStyle = Colors.SNAKE_COLOUR;
    Canvas.context.strokeStyle = Colors.SNAKE_BORDER_COLOUR;
    Canvas.context.fillRect(snakePart.x, snakePart.y, 10, 10);
    Canvas.context.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }

  public drawSnake() {
    this.food.snake.map(snakePart => this.drawSnakePart(snakePart));
  }

  public moveSnake() {
    const head = {
      x: this.food.snake[0].x + this.dx,
      y: this.food.snake[0].y + this.dy
    };
    this.food.snake.unshift(head);
    const didEatFood =
      this.food.snake[0].x === this.food.foodX &&
      this.food.snake[0].y === this.food.foodY;
    if (didEatFood) {
      this.score += 10;
      document.getElementById('score')!.innerHTML = this.score.toString();
      this.food.createFood();
    } else {
      this.food.snake.pop();
    }
  }
}
