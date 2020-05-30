import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(
    private bluetoothSerial: BluetoothSerial,
    private alertController: AlertController
  ) {}

  devices: Array<any> = [];

  ngOnInit(): void {
    this.checkBluetoothEnabled();
  }

  private checkBluetoothEnabled() {
    this.bluetoothSerial.isEnabled().then(
      success => {
        this.getDevices();
      },
      error => {
        this.showAlert('Enable bluetooth and retry');
      }
    );
  }

  private showAlert(message: string) {
    this.alertController
      .create({
        cssClass: 'my-custom-class',
        header: 'Error',
        message,
        buttons: ['OK'],
      })
      .then(alert => alert.present());
  }

  private getDevices() {
    this.bluetoothSerial.list().then(
      devices => (this.devices = devices),
      failure => this.showAlert('Enable bluetooth and retry')
    );
  }
}
