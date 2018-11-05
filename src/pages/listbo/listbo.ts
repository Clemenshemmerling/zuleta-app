import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { HttpParams } from '@angular/common/http';
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
  urlScan: string ="http://trackenviosinternacional.com/tracking/deprixa/listscan.php";
  urlUnscan: string ="http://trackenviosinternacional.com/tracking/deprixa/listunscan.php";
  urlDelete: string ="http://trackenviosinternacional.com/tracking/deprixa/appunscan.php";
  scandata: any;
  unscandata:any;
  spinner:boolean = true;
  envio:string;
  scan:any =[];
  unscan:any = [];
  user:any = [];
  scanShow: boolean = false;
  unscanShow: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public authService:AuthService) {
    this.user = JSON.parse(localStorage.getItem('logUser'));            
    this.api();
  }

  api() {
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
    this.spinner = true;
    
    for(let i = 0; i < this.scandata.length; i++) {
      if(this.envio == this.scandata[i].numViaje) {
        this.scan.push(this.scandata[i]);
      }
    }

    for(let i = 0; i < this.unscandata.length; i++) {
      if(this.envio == this.unscandata[i].numViaje) {
        this.unscan.push(this.unscandata[i]);
      }
    }

    this.spinner = false;
    console.log(this.spinner);
  }

  listscan() {
    if(this.scanShow == true) {
      this.scanShow = false;
    } else {
      this.scanShow = true;
    }
  }

  listunscan() {
    if(this.unscanShow == true) {
      this.unscanShow = false;
    } else {
      this.unscanShow = true;
    }
  }

  borrar(r) {
    this.spinner = true;
    const data = new HttpParams()
      .set('cid', r.cid)
      .set('user', this.user.name);
    
    this.authService.post(this.urlDelete, data).subscribe(
      (res) => {
        this.api();
      }, (error) => {
        console.log(error);
      }
    );  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListboPage');
  }

}
