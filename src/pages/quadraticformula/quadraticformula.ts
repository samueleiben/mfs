import { Component } from '@angular/core';

@Component({
  selector: 'page-quadraticformula',
  templateUrl: 'quadratic_formula.html'
})
export class QuadraticFormulaPage {
  results: {txt: string, first: number, second: number}
  inputs: {a: number, b: number, c: number};

  constructor() {
    this.results = {txt: 'Results', first: NaN, second: NaN}
    this.inputs = {a: 0, b: 0, c: 0};
  }

  calculate() {
    var a = this.inputs.a;
    var b = this.inputs.b;
    var c = this.inputs.c;
    var discriminant = Math.sqrt(Math.pow(b, 2)-4*a*c);

    this.results.first = ((-b + discriminant)/(2*a));
    this.results.second = ((-b - discriminant)/(2*a));

    var resultText;
    if(this.results.first == this.results.second) {
      resultText = 'Result (only one)';
    } else if(this.results.first == NaN) {
      resultText = 'No result';
    } else {
      resultText = 'Results'
    }
    this.results.txt = resultText;
  }
}
