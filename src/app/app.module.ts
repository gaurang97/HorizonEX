import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import{BluetoothSerial} from '@ionic-native/bluetooth-serial'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import{DetailPage} from '../pages/detail/detail';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { SMS } from '@ionic-native/sms';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';
import{HttpClientModule} from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SMS,
    AndroidPermissions,
    TextToSpeech,
    NetworkEngineProvider,
    
  ]
})
export class AppModule {}
