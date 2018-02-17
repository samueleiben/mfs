import { Component } from '@angular/core';

import { Parser } from './parser';

@Component({
  selector: 'page-graphplotter',
  templateUrl: 'graph_plotter.html'
})
export class GraphPlotterPage {
  result: number;
  x: number;
  formula: string;

  constructor() {
    this.formula = 'x * (2x) + (2 + (9^5))(e) + 25 + log(234)';
    this.x = 5;
  }

  calculate(x: number) {
    let p = new Parser(this.formula);
    this.result = p.parse(x);
  }
}
