import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-roots',
  templateUrl: 'roots.html'
})
export class RootsPage {
  result: number;
  nthRoot: {txt: string, value: number, input: number};
  canvasHeight: number;
  canvasWidth: number;

  constructor(public navCtrl: NavController, public plt: Platform) {
    this.canvasHeight = 50;
    this.canvasWidth = (plt.width() - 60) / 3;

    this.nthRoot = {txt: '3rd', value: 3, input: 3};
    this.result = 0;
  }

  ngOnInit() {
    this.redrawCanvas();
  }

  redrawCanvas() {
    let canvas = document.getElementById('nthroot_canvas') as HTMLCanvasElement;
			if(canvas.getContext){
				var ctx = canvas.getContext("2d");
				canvas.width = this.canvasWidth * 3;
        canvas.height = this.canvasHeight * 3;
				ctx.setTransform(3, 0, 0, 3, 0, 0);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#000000";

				ctx.beginPath();
				ctx.moveTo(30, 5);
				var rootLength;
				if(!this.nthRoot.input) {
					this.nthRoot.input = NaN;
				}
				rootLength = this.nthRoot.input.toString().length * 10;
				ctx.lineTo(30 + 5 + rootLength * 1.1, 5);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(30, 5);
				ctx.lineTo(15, 45);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(15, 45);
				ctx.lineTo(10, 30);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(10, 30);
				ctx.lineTo(5, 30);
				ctx.stroke();

				ctx.font="20px Arial";
				ctx.fillText(String(this.nthRoot.input), 30, 35);

				ctx.font="10px Arial";
				var nLength = 1;
				if(this.nthRoot.value) {
					nLength = this.nthRoot.value.toString().length;
				} else {
					nLength = 3;
					this.nthRoot.value = NaN;
				}

        ctx.fillText(String(this.nthRoot.value), 30 - 10 - nLength * 5, 5 + 10);

				var spaceLeftAfterRoot = 30 + 5 + rootLength * 1.1;
				ctx.font="20px Arial";
				ctx.fillText("=", spaceLeftAfterRoot + 10, 35);
				ctx.fillText(String(this.result), spaceLeftAfterRoot + 30, 35)
    }
  }

  calculate() {
    this.result = Math.pow(this.nthRoot.input, 1 / this.nthRoot.value);
  	this.redrawCanvas();
  }

  nChanged() {
    var n = this.nthRoot.value;
    if(n == 1) {
      this.nthRoot.txt = '1st';
    } else if(n == 2) {
      this.nthRoot.txt = '2nd';
    } else if(n == 3) {
      this.nthRoot.txt = '3rd';
    } else {
      this.nthRoot.txt = n + 'th';
    }

    this.redrawCanvas();
  }

}
