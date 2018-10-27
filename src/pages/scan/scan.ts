import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../services/auth';
import { HttpParams } from '@angular/common/http';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  options: BarcodeScannerOptions;
  scanData:any = {};  
  track:string = "";
  show:string = "home";
  api:string = "http://trackenviosinternacional.com/tracking/deprixa/codigo-app.php";
  urlPost:string = "http://trackenviosinternacional.com/tracking/deprixa/post-test.php";
  agentes:any = [];
  state:string = "";
  info:any = [];
  states:any = [];
  agente:string = "";
  boxes:any = [];
  box:string = "";
  comment:string = "";
  error:any;
  user:any = [];
  data:any;
  spinner:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public scanner: BarcodeScanner, private authService: AuthService,
              public toastCtrl: ToastController) {
    this.user = JSON.parse(localStorage.getItem('logUser'));                    
    this.authService.get(this.api).subscribe(  
      (data) => {
        this.info = data;
        this.states = this.info.GUATEMALA;
        this.spinner = false;
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    );         
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  scan() {
    this.options = {
      prompt: 'Scanear caja'
    };
    this.scanner.scan(this.options).then(
      (data) => {
        this.show = "scan";
        this.scanData = data;
        this.track = data.text;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agent() {
    for(let i=0; i < this.states.length; i++) {
      if(this.state == this.states[i].nombre) {
        this.agentes = this.states[i].sucursales;
      }
    }
  }

  size() {
    for(let i=0; i < this.agentes.length; i++) {
      if(this.agente == this.agentes[i].nombre) {
        this.boxes = this.agentes[i].info;
      }
    }
  }

  post() {
    const data = new HttpParams()
      .set('estado', this.state)
      .set('agencia', this.agente)
      .set('tamano', this.box)
      .set('track', this.track)
      .set('comment', this.comment)
      .set('user', this.user.name);
      

    this.authService.post(this.urlPost, data).subscribe(
      (res) => { 
        this.scan();
        this.comment = "";
        let toast = this.toastCtrl.create({
          message: 'Se agrego correctamente',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      },(error) => {
        this.error = error;
        console.log(this.error);
      }
    );
  }

  newSelect() {
    this.comment = "";
    this.show = "home";
  }
  
}
