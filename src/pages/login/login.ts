import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  users: any = [];
  user: string = "";
  logUser: any = [];
  password: string = "";
  url: string= "http://trackenviosinternacional.com/tracking/deprixa/app.php";
  constructor(public navCtrl: NavController, public navParams: NavParams,
            private authService: AuthService) {
    this.authService.get(this.url).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let i
    for(i=0; i < this.users.length; i++) {
      if(this.user === this.users[i].name && this.password === this.users[i].pwd) {
        localStorage.setItem('logUser',JSON.stringify(this.users[i]));
        this.navCtrl.setRoot(HomePage);
      }
    }
  }

}