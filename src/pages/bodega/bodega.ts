import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../services/auth';
import { HttpParams } from '@angular/common/http';
import { ListboPage } from '../listbo/listbo';

/**
 * Generated class for the BodegaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bodega',
  templateUrl: 'bodega.html',
})
export class BodegaPage {
  options: BarcodeScannerOptions;
  scanData:any;
  track:string;
  contenedor:string;
  status:string;
  envio:string;
  user:any;
  show:string = "home";
  urlPost:string = "http://trackenviosinternacional.com/tracking/deprixa/scantest.php";
  error:any;
  info:any = [
    {
      text: "EN AGENCIA ESPERANDO SALIDA" 
    },
    {
      text: "ADUANA ESTADOS UNIDOS" 
    },
    {
      text: "ADUANA GUATEMALA" 
    },
    {
      text: "EN BODEGA GUATEMALA" 
    },
    {
      text: "EN RUTA DE ENTREGA" 
    },
    {
      text: "SEGUNDO INTENTO DE ENTREGA" 
    },
    {
      text: "NO ENTREGADA REGRESO A BODEGA" 
    },
    {
      text: "EN ADUANA HONDURAS" 
    },
    {
      text: "EN ADUANA SALVADOR" 
    },
    {
      text: "ESPERANDO TURNO PARA PREVIA" 
    },
    {
      text: "XX" 
    },
    {
      text: "TURNO PARA REVISION PREVIA" 
    },
    {
      text: "TURNO PARA CONTADOR VISTA" 
    },
    {
      text: "TURNO PARA SALIDA" 
    },
    {
      text: "EN BODEGA SALVADOR" 
    },
    {
      text: "EN BODEGA HONDURAS" 
    },
    {
      text: "PENDIENTE DE PAGO" 
    },
    {
      text: "LIBERACION" 
    },
    {
      text: "CON TURNO PARA" 
    },
    {
      text: "NOTA 1" 
    },
    {
      text: "NOTA 2" 
    },
    {
      text: "PAGAN EN GUATEMALA" 
    },
    {
      text: "NOTA 3" 
    },
    {
      text: "NOTA 4" 
    },
    {
      text: "NOTA 5" 
    },
    {
      text: "NOTA 6" 
    },
    {
      text: "SCAN" 
    },
    {
      text: "SCAN2" 
    },
    {
      text: "EN ADUANA MEXICO" 
    },
    {
      text: "ENTREGADA" 
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public scanner: BarcodeScanner, private autService: AuthService,
              public toastCtrl: ToastController) {
    this.user = JSON.parse(localStorage.getItem('logUser'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BodegaPage');
  }

  scan() {
    this.options = {
      prompt: 'Scanear caja'
    };
    this.scanner.scan(this.options).then(
      (data) => {
        this.scanData = data;
        this.track = data.text;
        this.show = "scan";
      },
      (error) => {
        console.log(error);
      }
    );
  }

  post() {
    const data = new HttpParams()
      .set('contenedor', this.contenedor)
      .set('track', this.track)
      .set('status', this.status)
      .set('user', this.user.name);

    this.autService.post(this.urlPost, data).subscribe(
      (res) => {
        this.scan();
        let toast = this.toastCtrl.create({
          message: 'Se agrego correctamente',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (error) => {
        console.log(error);
        this.error = error;
      }
    );
  }

  list(){
    this.navCtrl.push(ListboPage);
  }

}
