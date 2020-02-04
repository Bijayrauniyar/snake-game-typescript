import { Colors } from './constants.js';

export class Canvas {
  public width: number;
  public height: number;
  private xPoint: number;
  private yPoint: number;

  public static context: CanvasRenderingContext2D;

  constructor(width: number, height: number, xPoint: number, yPoint: number) {
    this.width = width;
    this.height = height;
    this.xPoint = xPoint;
    this.yPoint = yPoint;
  }

  public init(el: HTMLCanvasElement) {
    el.height = this.height;
    el.width = this.width;
    Canvas.context = el.getContext('2d')!;
  }

  public clearCanvas() {
    Canvas.context.fillStyle = Colors.CANVAS_BACKGROUND_COLOUR;
    Canvas.context.strokeStyle = Colors.CANVAS_BORDER_COLOUR;
    Canvas.context.fillRect(this.xPoint, this.yPoint, this.width, this.height);
    Canvas.context.strokeRect(
      this.xPoint,
      this.yPoint,
      this.width,
      this.height
    );
  }
}
