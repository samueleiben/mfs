import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Plotter } from '../../common/plotter';

@Component({
  selector: 'page-graphplotter',
  templateUrl: 'graph_plotter.html'
})
export class GraphPlotterPage {
  formula: string;
  canvasWidth: number;
  canvasHeight: number;

  constructor(public plt: Platform) {
    this.formula = 'x * (2x)';
    this.canvasWidth = plt.width();
    this.canvasHeight = this.canvasWidth; // canvas should be a square
  }

  ngOnInit() {
    this.plot();
  }

  plot() {
    let p = new Plotter(this.canvasWidth, this.canvasHeight, this.formula);
    p.plot();
  }
}
