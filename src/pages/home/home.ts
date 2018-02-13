import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RootsPage } from '../roots/roots'
import { UnitcirclePage } from '../unitcircle/unitcircle'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  components: Array<{title: string, desc: string, page: any}>;

  constructor(public navCtrl: NavController) {
    this.components = [
      {title: 'Roots', desc: 'Take nth root of a number', page: RootsPage},
      {title: 'Unitcircle', desc: 'Graphical representation of sin cos and tan', page: UnitcirclePage}
    ]
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
