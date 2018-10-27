import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
import { RecivePage } from '../recive/recive';
import { BodegaPage } from '../bodega/bodega';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = [];

  constructor(public navCtrl: NavController) {
    this.user = JSON.parse(localStorage.getItem('logUser'));
  }

  scan() {
    this.navCtrl.push(ScanPage);
  }

  revci() {
    this.navCtrl.push(RecivePage);
  }

  bodeg() {
    this.navCtrl.push(BodegaPage);
  }

}
