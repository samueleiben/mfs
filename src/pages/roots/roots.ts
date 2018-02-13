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
    this.canvasWidth = (plt.width() - 60) / 4; // canvasHeight is calculated in redrawCanvas

    this.nthRoot = {txt: '3rd', value: 3, input: 0};
    this.result = 0;
  }

  ngOnInit() {
    this.redrawCanvas();
  }

  redrawCanvas() {
    let canvas = document.getElementById('nthroot_canvas') as HTMLCanvasElement;
			if(canvas.getContext){
				if(!this.nthRoot.input) {
					this.nthRoot.input = NaN;
				}
				var rootLength = this.nthRoot.input.toString().length * 10;
        var spaceLeftAfterRoot = 30 + 5 + rootLength * 1.1;
        var xCoordOfEquals = (spaceLeftAfterRoot + 10);
        var x = this.canvasWidth / 4 * 1.6;
        var scale = x / xCoordOfEquals; // scale drawing in order to fit it into the screen
        console.log("x: " + x + " | xCoordOfEquals: " + xCoordOfEquals + " | scale: " + scale);
        scale = Math.min(scale, 1.5);

        this.canvasHeight = 45 * scale + 5; // lowest point of canvas + 5 extra pixels

				var ctx = canvas.getContext("2d");
				canvas.width = this.canvasWidth * 4;
        canvas.height = this.canvasHeight * 4;
				ctx.setTransform(4, 0, 0, 4, 0, 0); // transform canvas for better quality
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#000000";

				ctx.beginPath();
				ctx.moveTo(30 * scale, 5 * scale);
				ctx.lineTo((30 + 5 + rootLength * 1.1) * scale, 5 * scale);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(30 * scale, 5 * scale);
        ctx.lineTo(15 * scale, 45 * scale);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(15 * scale, 45 * scale);
				ctx.lineTo(10 * scale, 30 * scale);
				ctx.stroke();

				ctx.beginPath();
				ctx.moveTo(10 * scale, 30 * scale);
				ctx.lineTo(5 * scale, 30 * scale);
				ctx.stroke();

        var fontSize = 20 * scale;
				ctx.font = fontSize + "px Arial";
				ctx.fillText(String(this.nthRoot.input), 30 * scale, 35 * scale);

        fontSize = 10 * scale;
				ctx.font = fontSize + "px Arial";
				var nLength = 1;
				if(this.nthRoot.value) {
					nLength = this.nthRoot.value.toString().length;
				} else {
					nLength = 3;
					this.nthRoot.value = NaN;
				}

        ctx.fillText(String(this.nthRoot.value), (30 - 10 - nLength * 5) * scale, (5 + 10) * scale);

        fontSize = 20 * scale;
				ctx.font = fontSize + "px Arial";
				ctx.fillText("=", (spaceLeftAfterRoot + 10) * scale, 35 * scale);
				ctx.fillText(String(this.result), (spaceLeftAfterRoot + 30) * scale, 35 * scale)
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
