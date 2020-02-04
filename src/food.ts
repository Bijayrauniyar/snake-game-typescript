import { Colors } from './constants.js';
import { Canvas } from './canvas.js';

interface Point {
  x: number;
  y: number;
}

export class Food {
  foodX: number = 0;
  foodY: number = 0;
  canvas: Canvas;
  snake: Array<Point>;

  constructor(canvas: Canvas) {
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
  private randomTen(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }
  public createFood() {
    this.foodX = this.randomTen(0, this.canvas.width - 10);
    this.foodY = this.randomTen(0, this.canvas.height - 10);

    this.snake.forEach(part => {
      const foodIsOnSnake = part.x == this.foodX && part.y == this.foodY;
      if (foodIsOnSnake) this.createFood();
    });
  }
  public drawFood() {
    Canvas.context.fillStyle = Colors.FOOD_COLOUR;
    Canvas.context.strokeStyle = Colors.FOOD_BORDER_COLOUR;
    Canvas.context.fillRect(this.foodX, this.foodY, 10, 10);
    Canvas.context.strokeRect(this.foodX, this.foodY, 10, 10);
  }
}
