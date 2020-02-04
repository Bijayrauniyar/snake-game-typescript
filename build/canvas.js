import { Colors } from './constants.js';
var Canvas = /** @class */ (function () {
    function Canvas(width, height, xPoint, yPoint) {
        this.width = width;
        this.height = height;
        this.xPoint = xPoint;
        this.yPoint = yPoint;
    }
    Canvas.prototype.init = function (el) {
        el.height = this.height;
        el.width = this.width;
        Canvas.context = el.getContext('2d');
    };
    Canvas.prototype.clearCanvas = function () {
        Canvas.context.fillStyle = Colors.CANVAS_BACKGROUND_COLOUR;
        Canvas.context.strokeStyle = Colors.CANVAS_BORDER_COLOUR;
        Canvas.context.fillRect(this.xPoint, this.yPoint, this.width, this.height);
        Canvas.context.strokeRect(this.xPoint, this.yPoint, this.width, this.height);
    };
    return Canvas;
}());
export { Canvas };
