import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController, LoadingController } from 'ionic-angular';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SMS } from '@ionic-native/sms';
import{NetworkEngineProvider} from '../../providers/network-engine/network-engine';
import{DetailPage} from '../detail/detail';
import { setTimeout } from 'timers';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  output:any;
  message:String;
  responseTxt:any;
  unpairedDevices: any;
  pairedDevices: any;
  statusMessage: string;
  gettingDevices: Boolean;
  constructor(public network:NetworkEngineProvider,public tts:TextToSpeech, public loadCtrl:LoadingController, public androidPermissions: AndroidPermissions,private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController, public navCtrl:NavController,private ngZone: NgZone,private smsVar: SMS) {
    bluetoothSerial.enable();

    
  }
  ionViewWillEnter()
  {
  
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
    success => console.log('Permission granted'),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
  );
  
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }
  startScanning() {
    this.pairedDevices = null;
    this.unpairedDevices = null;
    this.gettingDevices = true;
    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(element => {
        
      });
    },
      (err) => {
        console.log(err);
      })

    this.bluetoothSerial.list().then((success) => {
      this.pairedDevices = success;
    },
      (err) => {

      })
  }
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Connect',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
        
          }
        }
      ]
    });
    alert.present(
      
    );

  }


  disconnect() {
    let alert = this.alertCtrl.create({
      title: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            alert.dismiss();
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
            this.gettingDevices=null;
          }
        }
      ]
    });
    alert.present();
  }
  next(){
    this.navCtrl.push('TerminalPage');
  }

 data(){
        setInterval(()=>{
          this.read1();
        } ,3000);

        
      }
      

read(){
  this.bluetoothSerial.read().then((data)=>
  {
   this.message=data;
    
    })
    this.network.writeTable(this.message).then(data=>
      {
        console.log(" Received : "+ JSON.stringify(data));
      this.responseTxt = ""+ JSON.stringify(data);
      })
   
  
}
read1(){
  this.ngZone.run(()=>{
    this.read();
  })
}

  
  sendSMS(){
    var options={
          replaceLineBreaks: false, 
          android: {
               intent: ''
              
            }
    }
    this.smsVar.send('7733842339', 'FAULT FOUND AT LOCATION 3EA1',options)
      .then(()=>{
        const loading = this.loadCtrl.create({
          spinner:'dots',
          content:'Message Sent Successfully'
           
   });
 
   loading.present();
 
   setTimeout(() => {
     loading.dismiss();
   }, 2000);
      },()=>{
      alert("failed");
      });
  }
    page(){
      this.navCtrl.push(DetailPage);
    }
  }
