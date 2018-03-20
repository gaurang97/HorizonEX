import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BluetoothSerial} from '@ionic-native/bluetooth-serial'
import{NetworkEngineProvider} from '../../providers/network-engine/network-engine';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  peripheral: any = {};
  statusMessage: string;
responseTxt:any;
  constructor(public network:NetworkEngineProvider,
    public navCtrl: NavController, 
              public navParams: NavParams, 
              private ble: BluetoothSerial,
              private toastCtrl: ToastController,
              private ngZone: NgZone) {

              }
              showTable(){
                this.network.readTable().then(data=>
              {
                console.log(" Received : "+ JSON.stringify(data));
              this.responseTxt = ""+ JSON.stringify(data);
              })
              }
              
              disconnect(){
                this.navCtrl.push('ChartsPage');
              }

}