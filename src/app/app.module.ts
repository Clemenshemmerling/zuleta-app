import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { RecivePage } from '../pages/recive/recive';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule} from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular';
import { NativeHttpModule, NativeHttpBackend, NativeHttpFallback } from 'ionic-native-http-connection-backend';
import { BodegaPage } from '../pages/bodega/bodega';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ScanPage,
    RecivePage,
    BodegaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    NativeHttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ScanPage,
    RecivePage,
    BodegaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    NativeHttpFallback, 
    {provide: ErrorHandler, useClass: IonicErrorHandler,  deps: [Platform, NativeHttpBackend]},
    AuthService,
    HTTP
  ]
})
export class AppModule {}