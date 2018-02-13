import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RootsPage } from '../roots/roots'
import { UnitcirclePage } from '../unitcircle/unitcircle'
import { QuadraticFormulaPage } from '../quadraticformula/quadraticformula'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  components: Array<{title: string, desc: string, page: any}>;

  constructor(public navCtrl: NavController) {
    this.components = [
      {title: 'Roots', desc: 'Take nth root of a number', page: RootsPage},
      {title: 'Unitcircle', desc: 'Graphical representation of sin cos and tan', page: UnitcirclePage},
      {title: 'Quadratic formula', desc: '', page: QuadraticFormulaPage} // don't leave desc out, empty desc is needed that no build errors occur
    ]
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
