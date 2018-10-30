import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the ListboPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listbo',
  templateUrl: 'listbo.html',
})
export class ListboPage {
  urlScan: string = "http://trackenviosinternacional.com/tracking/deprixa/listscan.php";
  urlUnscan: string ="http://trackenviosinternacional.com/tracking/deprixa/listunscan.php";
  scandata: any;
  unscandata:any;
  spinner:boolean = true;
  envio:string;
  scan:any =[];
  unscan:any;
  scanShow: boolean = false;
  unscanShow: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService:AuthService) {
    this.authService.get(this.urlScan).subscribe(
      (data) => {
        this.scandata = data;
      },(error) => {
        console.log('error '+ error);
      }
    );
    
    this.authService.get(this.urlUnscan).subscribe(
      (data) => {
        this.unscandata = data;
        this.spinner = false;
      },(error) => {
        console.log('error '+ error);
      }
    );
  }

  search() {
    for(let i = 0; i < this.scandata.length; i++) {
      console.log(this.scandata[i].numViaje);
      if(this.envio == this.scandata[i].numViaje) {
        this.scan.push(this.scandata[i]);
      }
    }
  }

  listscan() {
    if(this.scanShow == true) {
      this.scanShow = false;
    } else {
      this.scanShow = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListboPage');
  }

}
