import { Canvas } from './canvas.js';
import { Colors, Keys } from './constants.js';
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

  didGameEnd() {
    for (let i = 4; i < this.food.snake.length; i++) {
      const didCollide =
        this.food.snake[i].x === this.food.snake[0].x &&
        this.food.snake[i].y === this.food.snake[0].y;
      if (didCollide) return true;
    }
    const hitLeftWall = this.food.snake[0].x < 0;
    const hitRightWall = this.food.snake[0].x > this.canvas.width - 10;
    const hitToptWall = this.food.snake[0].y < 0;
    const hitBottomWall = this.food.snake[0].y > this.canvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }

  changeDirection(event: KeyboardEvent) {
    // if (changingDirection) return;
    // changingDirection = true;
    console.log('direct', event);
    const keyPressed = event.keyCode;
    const goingUp = this.dy === -10;
    const goingDown = this.dy === 10;
    const goingRight = this.dx === 10;
    const goingLeft = this.dx === -10;

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
  }
}
