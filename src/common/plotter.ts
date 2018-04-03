import { Parser } from './parser';

export class Plotter {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  parser: Parser;

  constructor(width: number, height: number, formula: string) {
    this.parser = new Parser(formula);
    this.canvas = document.getElementById('graph_canvas') as HTMLCanvasElement;
    this.canvas.width = width;
    this.canvas.height = height;
    if(this.canvas.getContext){
      this.ctx = this.canvas.getContext("2d");
      this.ctx.setTransform(2, 0, 0, 2, 0, 0); // transform canvas for better quality --> values divided by 2
    }
  }

  plot() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    // translate to the middle
    this.ctx.translate(this.canvas.width / 4, this.canvas.height / 4);
    // rotate 180°
    this.ctx.rotate(3.1415);
    // reflect
    this.ctx.scale(-1, 1);

    this.drawFunction();
  }

  drawGrid() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = 0.5;
    // draw vertical line
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height / 4);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height / 4);
    this.ctx.stroke();

    // draw horizontal line
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 4, 0);
    this.ctx.lineTo(this.canvas.width / 4, this.canvas.height / 2);
    this.ctx.stroke();
  }

  drawFunction() {
    for(let x = -(this.canvas.width / 4); x < this.canvas.width / 4; x++) {
      this.ctx.fillRect(x, this.calculate(x), 1, 1);
      console.log(x, this.calculate(x));
    }
  }

  calculate(x: number) {
    return this.parser.parse(x);
  }
}
