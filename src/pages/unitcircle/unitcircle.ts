import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-unitcircle',
  templateUrl: 'unitcircle.html'
})
export class UnitcirclePage {
  clipboard: Clipboard;

  values: {min: number, max: number, current: number};
  canvasHeight: number;
  canvasWidth: number;
  sin: number;
  cos: number;
  tan: number;

  constructor(public navCtrl: NavController, public plt: Platform, public clpb: Clipboard, private toastCtrl: ToastController) {
    this.clipboard = clpb;

    this.canvasWidth = plt.width() - 40; // remove padding from device width
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
		if(canvas.getContext){
			var ctx = canvas.getContext("2d");
			canvas.width = this.canvasWidth;
			canvas.height = this.canvasHeight;
			ctx.setTransform(2, 0, 0, 2, 0, 0);

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// outer circle
			ctx.beginPath();
			ctx.arc(75, 75, 70, 0, 2 * Math.PI);
			ctx.strokeStyle="#000000";
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.lineWidth = 1;
			// draw x-axis
			ctx.beginPath()
			ctx.moveTo(5, 75);
			ctx.lineTo(75 + 70 + 5, 75);
			ctx.strokeStyle = "#000000";
			ctx.setLineDash([5, 5]);
			ctx.stroke();
			// draw y-axis
			ctx.beginPath()
			ctx.moveTo(75, 5);
			ctx.lineTo(75, 75 + 70 + 5);
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
			var sinLength = -this.sin * 70;
			var cosLength = this.cos * 70;
			var tanLenght = this.tan * 70;

			// unit line
			ctx.beginPath();
			ctx.moveTo(75, 75);
			// -sin and -cos will subtracted
			ctx.lineTo(75 + cosLength, 75 + sinLength);
			ctx.strokeStyle="#000000";
			ctx.stroke();
			// sinus line
			ctx.beginPath();
			ctx.moveTo(75 + cosLength, 75);
			// -sin and -cos will subtracted
			ctx.lineTo(75 + cosLength, 75 + sinLength);
			ctx.strokeStyle="#FF0000";
			ctx.stroke();
			// cosinus line
			ctx.beginPath();
			ctx.moveTo(75, 75);
			ctx.lineTo(75 + cosLength, 75);
			ctx.strokeStyle="#00FF00";
			ctx.stroke();
			// draw angle circle
			ctx.beginPath();
			ctx.arc(75, 75, 30, 0 * (Math.PI / 180), -this.values.current * (Math.PI / 180), true);
			ctx.strokeStyle="#555555";
			ctx.stroke();

			ctx.fillText(this.values.current + "°", 75 + 4, 75 - 10);
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
