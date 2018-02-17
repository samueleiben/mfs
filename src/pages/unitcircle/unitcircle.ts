import { Component } from '@angular/core';
import { ToastController, Platform } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-unitcircle',
  templateUrl: 'unitcircle.html'
})
export class UnitcirclePage {
  values: {min: number, max: number, current: number};
  canvasHeight: number;
  canvasWidth: number;
  sin: number;
  cos: number;
  tan: number;

  constructor(public plt: Platform, public clipboard: Clipboard, private toastCtrl: ToastController) {

    this.canvasWidth = plt.width();
    this.canvasHeight = this.canvasWidth; // canvas should be a square

    this.values = {
          min: 0,
          max: 360,
          current: 0
    }
  }

  ngOnInit() {
    this.redrawCanvas();
  }

  redrawCanvas() {
    let canvas = document.getElementById('unitcircle_canvas') as HTMLCanvasElement;
    var paddingY = 0.5;
    var paddingX = 0.5;
		if(canvas.getContext){
			var ctx = canvas.getContext("2d");
			canvas.width = this.canvasWidth;
			canvas.height = this.canvasHeight;
			ctx.setTransform(2, 0, 0, 2, 0, 0); // transform canvas for better quality --> all the coordinates need to be half as big

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// outer circle
			ctx.beginPath();
			ctx.arc(this.canvasWidth / 4 + paddingX / 2, this.canvasHeight / 4 + paddingY / 2, this.canvasWidth / 4 - paddingX - paddingY, 0, 2 * Math.PI);
			ctx.strokeStyle="#000000";
			ctx.lineWidth = 2;
			ctx.stroke();
			ctx.lineWidth = 1;
			// draw x-axis
			ctx.beginPath()
			ctx.moveTo(paddingX, this.canvasHeight / 4 + paddingY);
			ctx.lineTo(this.canvasWidth - 2 * paddingX, this.canvasHeight / 4 + paddingY);
			ctx.strokeStyle = "#000000";
			ctx.setLineDash([5, 5]);
			ctx.stroke();
			// draw y-axis
			ctx.beginPath()
			ctx.moveTo(this.canvasWidth / 4 + paddingX, paddingY);
			ctx.lineTo(this.canvasWidth / 4 + paddingX, this.canvasHeight - 2 * paddingY);
			ctx.strokeStyle = "#000000";
			ctx.setLineDash([5, 5]);
			ctx.stroke();

			ctx.setLineDash([5, 0]);

			this.sin = Math.sin(this.values.current * (Math.PI / 180));
			this.cos = Math.cos(this.values.current * (Math.PI / 180));
      this.tan = Math.tan(this.values.current * (Math.PI / 180));

			// prevent cos from being 6.123233995736766e-17 (workaround)
			if(this.values.current == 90 || this.values.current == 270) {
				this.cos = 0;
			} else if(this.values.current == 180) {
				this.sin = 0;
				this.tan = 0;
			}

			// unit 1 corresponds to 140 (radius)
			var sinLength = -this.sin * (this.canvasHeight / 4);
			var cosLength = this.cos * (this.canvasWidth / 4);

			// unit line
			ctx.beginPath();
			ctx.moveTo(this.canvasWidth / 4 + paddingX, this.canvasHeight / 4 + paddingY);
			// -sin and -cos will subtracted
			ctx.lineTo(this.canvasWidth / 4 + paddingX + cosLength, this.canvasHeight / 4 + paddingY + sinLength);
			ctx.strokeStyle="#000000";
			ctx.stroke();
			// sinus line
			ctx.beginPath();
			ctx.moveTo(this.canvasWidth / 4 + cosLength + paddingX, this.canvasHeight / 4 + paddingY);
			// -sin and -cos will subtracted
			ctx.lineTo(this.canvasWidth / 4 + cosLength + paddingX, this.canvasHeight / 4 + paddingY + sinLength);
			ctx.strokeStyle="#FF0000";
			ctx.stroke();
			// cosinus line
			ctx.beginPath();
			ctx.moveTo(this.canvasWidth / 4 + paddingX, this.canvasHeight / 4 + paddingY);
			ctx.lineTo(this.canvasWidth / 4 + paddingX + cosLength, this.canvasHeight / 4 + paddingY);
			ctx.strokeStyle="#00FF00";
			ctx.stroke();
      // draw angle circle
			ctx.beginPath();
			ctx.arc(this.canvasWidth / 4 + paddingX, this.canvasHeight / 4 + paddingY, 30, 0 * (Math.PI / 180), -this.values.current * (Math.PI / 180), true);
			ctx.strokeStyle="#555555";
			ctx.stroke();

			ctx.fillText(this.values.current + "°", this.canvasWidth / 4 + paddingX + 4, this.canvasHeight / 4 + paddingY - 10);
    }
  }

  copySin() {
    this.clipboard.copy(String(this.sin));
    this.showToast('Sin');
  }

  copyCos() {
    this.clipboard.copy(String(this.cos));
    this.showToast('Cos');
  }

  copyTan() {
    this.clipboard.copy(String(this.tan));
    this.showToast('Tan');
  }

  showToast(trigFunction: String) {
    this.toastCtrl.create({
      message: trigFunction + ' value copied',
      duration: 2000
    }).present();
  }

}
