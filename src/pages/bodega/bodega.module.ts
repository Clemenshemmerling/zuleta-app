import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodegaPage } from './bodega';

@NgModule({
  declarations: [
    BodegaPage,
  ],
  imports: [
    IonicPageModule.forChild(BodegaPage),
  ],
})
export class BodegaPageModule {}
